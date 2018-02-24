import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '../../../../core/animations';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, FormsModule, FormBuilder, Validators } from '@angular/forms';
import { AlertComponent } from '../../../shared/alert.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'devices',
    styleUrls: [],
    templateUrl: './devices.component.html',
    animations: fuseAnimations
})
export class DevicesComponent implements OnInit {

    /**
     *
     */
    constructor(public dialog: MatDialog) {

    }

    ngOnInit() {
        let a;
    }

    openDialog() {
        this.dialog.open(AlertComponent, {
            width: '250px',
            data: {

            }
        })
    }
}
