import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuseConfigService } from '../../../../../core/services/config.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from './../../../../../../app/services/auth.service';
import { LoginModel } from './../../../../../../app/shared/login/login.model';
import { fuseAnimations } from '../../../../../core/animations';
import { UserService } from './../../../../../services/user.service';


@Component({
    selector: 'fuse-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: fuseAnimations
})
export class FuseLoginComponent implements OnInit {
    loginForm: FormGroup;
    loginFormErrors: any;
    loginModel: LoginModel;
    returnUrl: string;

    constructor(
        private fuseConfig: FuseConfigService,
        private formBuilder: FormBuilder,
        private authService: AuthenticationService,
        private router: Router,
        private route: ActivatedRoute,
        private userService: UserService
    ) {
        this.fuseConfig.setSettings({
            layout: {
                navigation: 'none',
                toolbar: 'none',
                footer: 'none'
            }
        });

        this.loginFormErrors = {
            email: {},
            password: {}
        };
        this.loginModel = new LoginModel();
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });

        this.loginForm.valueChanges.subscribe(() => {
            this.onLoginFormValuesChanged();
        });

        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboards';
    }

    onLoginFormValuesChanged() {
        for (const field in this.loginFormErrors) {
            if (!this.loginFormErrors.hasOwnProperty(field)) {
                continue;
            }

            // Clear previous errors
            this.loginFormErrors[field] = {};

            // Get the control
            const control = this.loginForm.get(field);

            if (control && control.dirty && !control.valid) {
                this.loginFormErrors[field] = control.errors;
            }
        }
    }

    signUp() {        
        this.authService.login(this.loginModel)
            .subscribe((response: any) => {                
                if (this.authService.isAuthenticated) {
                    this.userService.getUserDetails().subscribe(response => {
                        this.userService.setUser(response.json());
                        this.router.navigateByUrl(this.returnUrl)
                    })
                }
            })
    }
}
