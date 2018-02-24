import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
    selector   : 'dialog-overview-example-dialog',
    templateUrl: 'alert.component.html'
})
export class AlertComponent
{

    constructor(
        public dialogRef: MatDialogRef<AlertComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    )
    {
    }

    onNoClick(): void
    {
        this.dialogRef.close();
    }

}