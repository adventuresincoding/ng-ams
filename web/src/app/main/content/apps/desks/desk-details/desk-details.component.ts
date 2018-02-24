import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatTableDataSource } from '@angular/material';
import { CustomHttpService } from '../../../../../services/custom.service';
import { HttpUrlService } from '../../../../../services/http.url.service';
import { fuseAnimations } from '../../../../../core/animations';
import { Desk } from '../../../../../shared/models/desk/desk.model';
import { DeskWithHardware } from '../../../../../shared/models/desk/configured.desk';
import { Location } from '@angular/common';

@Component({
    selector: 'desk-details',
    styleUrls: ['./desk-details.component.scss'],
    templateUrl: './desk-details.component.html',
    animations: fuseAnimations
})

export class DeskDetailsDialogComponent implements OnInit {
    deviceId: number;
    desk: any;
    hardwareConfiguration: DeskWithHardware;
    dataSource = new MatTableDataSource();
    displayedColumns = ['name']
    /**
     *
     */
    constructor(public dialogRef: MatDialogRef<DeskDetailsDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any, private httpService: CustomHttpService,private location:Location) {
        this.deviceId = data.id;
    }

    ngOnInit() {
        this.httpService.get(HttpUrlService.deskManagement.Get, this.deviceId).map(response => {
            return response.json()
        }).subscribe((response: DeskWithHardware) => {
            debugger
            this.hardwareConfiguration = response;
            this.dataSource.data = response.softwareList;
            console.log(this.hardwareConfiguration);
        })
    }

    goBack() : void{
        this.location.back();
    }
}