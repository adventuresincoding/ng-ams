import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Software } from '../../../../../shared/models/software/software.model';
import { CustomHttpService } from "../../../../../services/custom.service";
import { MatDialog } from "@angular/material";
import { AlertComponent } from "../../../../shared/alert.component";

@Component({
    selector: 'software',
    styleUrls: ['./software.component.scss'],
    templateUrl: './software.component.html'
})
export class SoftwareComponent implements OnInit {

    softwareForm: FormGroup;
    software = new Software();
    softwareType = [];
    departmentType = [];
    licenseTypeList = [];
    isLoadingResults = false;
    isRateLimitReached = false;
    startDate = new Date();
    /**
     *
     */
    constructor(private fb: FormBuilder, private httpService: CustomHttpService, public dialog: MatDialog) {

        this.softwareType = [
            { text: 'OS', value: 1 }, { text: 'Tool', value: 2 }
        ];

        this.departmentType = [
            { text: '.NET', value: 1 }, { text: 'Java', value: 2 }
        ];

        this.licenseTypeList = [
            { text: 'Open Source', value: 1 }, { text: 'Licensed', value: 2 }
        ];

        this.softwareType = [
            { text: 'OS', value: 1 }, { text: 'Tool', value: 2 }
        ];

        this.softwareType = [
            { text: 'OS', value: 1 }, { text: 'Tool', value: 2 }
        ];

    }

    ngOnInit() {
        this.softwareForm = this.fb.group({
            softwareName: ['', [Validators.required]],
            softwareType: ['', [Validators.required]],
            department: ['', [Validators.nullValidator]],
            licenseType: ['', [Validators.required]],
            licenseKey: ['', [Validators.required]],
            purchasedFrom: ['', [Validators.required]],
            purchasedDate: ['', [Validators.required]],
            price: ['Amount in $', [Validators.required]],
            totalPrice: ['', [Validators.required]],
            noOfLicenses: ['', [Validators.required]],
            supportNo: ['', [Validators.required]],
            type: ['', [Validators.nullValidator]],
            validity: ['', [Validators.nullValidator]],
            validFrom: ['', [Validators.nullValidator]],
            validTill: ['', [Validators.nullValidator]],
            comments: ['', [Validators.nullValidator]],
        })
    }

    onSubmit() {
        this.isLoadingResults = true;
        this.httpService.post('Software/Add', this.software).subscribe(response => {
            debugger;
            console.log(response);
            this.softwareForm.reset();
            let dialogRef = this.dialog.open(AlertComponent, {
                width: '250px',
                data: {}
            });
        }, error => {

        }, () => {
            this.isLoadingResults = false;
        })
    }
}