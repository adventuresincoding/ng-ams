import { Injectable } from '@angular/core';
import { User } from './../shared/models/user/user.model';
import { HttpModule } from '@angular/http';
import { CustomHttpService } from './custom.service';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { AuthenticationService } from './../services/auth.service';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class UserService {

    public static user: User;
    private apiUrl: string;
    onUserSignIn: BehaviorSubject<User> = new BehaviorSubject<User>({});
    /**
     *
     */
    constructor(private _http: Http, private _authService: AuthenticationService) {
        //this.user = new User();
        // this.getUserDetails();
        this.apiUrl = environment.apiUrl;
    }

    getUser(): User {
        return UserService.user;
    }

    setUser(objUser) {
        let user = new User();
        for (let obj of objUser) {
            if (obj.type === 'name') {
                user.displayName = obj.value;
            }
        }
        UserService.user = user;
        this.onUserSignIn.next(UserService.user);
    }

    getUserDetails(): Observable<any> {
        let options = this._authService.getOptions();
        return this._http.get(this.apiUrl + 'User/GetUserDetails', options);
    }
}