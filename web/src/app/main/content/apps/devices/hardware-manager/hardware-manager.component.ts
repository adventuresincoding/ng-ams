import { Component, ViewEncapsulation, OnInit, ViewChild,Inject } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog,MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { HttpUrlService } from '../../../../../services/http.url.service';
import { CustomHttpService } from '../../../../../services/custom.service';
import { HardwareSearchCriteria, SearchCriteria } from '../../../../../shared/models/shared/SearchCriteria'
import { Page } from './../../../../../shared/models/common/page.model'
import { fuseAnimations } from '../../../../../core/animations';

@Component({
    selector: 'hardware-manager',
    styleUrls: [],
    templateUrl: './hardware-manager.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class HardwareManagerComponent implements OnInit {
    page = new Page();
    dialogRef: any;
    hardwareList: Array<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    dataSource = new MatTableDataSource(this.hardwareList);
    displayedColumns = ['brand', 'hardwareType', 'uniqueId', 'sNo', 'warranty', 'buttons'];
    searchCriteria = new SearchCriteria();

    /**
     *
     */
    constructor(private httpService: CustomHttpService, public dialog: MatDialog) {

    }

    ngOnInit() {
        debugger
        this.page.pageNumber = 0;
        this.page.size = 10;
        let criteria = new HardwareSearchCriteria();
        criteria.pageNumber = 1; criteria.pageSize = 10;
        this.httpService.post(HttpUrlService.hardwareManagement.GetHardwareList, this.searchCriteria).subscribe(response => {
            if (this.hardwareList === undefined)
                this.hardwareList = [];
            this.hardwareList = response.json();
            this.customPageSetter();
            this.dataSource = new MatTableDataSource(this.hardwareList);
            this.dataSource.paginator = this.paginator;
            this.customPageSetter();

        }, error => {
            this.dataSource = new MatTableDataSource(this.hardwareList);
            this.dataSource.paginator = this.paginator;
        })
        // this.onHardwareSearch(this.searchCriteria);
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    // editHardware(id: number) {
    //     this._router.navigate(['/apps/employees/edit', id]);
    // }

    customPageSetter() {
        this.page.pageNumber = 1;
        let totalElements = this.hardwareList.length > 0 ? this.hardwareList[0].totalCount : 0;
        let totalPages = Math.floor(totalElements / this.page.size);
        totalPages = (totalElements % this.page.size) > 0 ? totalPages + 1 : totalPages;
        this.page = { size: this.page.size, totalElements: totalElements, totalPages: totalPages, pageNumber: 0 };
    }

    /**
    * Performs pagination...Called when a pageno is clicked..
    * @param pageInfo 
    */
    setPage(pageInfo) {
        this.searchCriteria.pageNumber = pageInfo.offset + 1;
        this.searchCriteria.pageSize = 10;
        this.onHardwareSearch(this.searchCriteria);
    }

    onHardwareSearch(criteria: SearchCriteria) {
        criteria.pageNumber = (criteria.pageNumber === 0 || criteria.pageNumber === undefined) ? 1 : criteria.pageNumber;
        criteria.pageSize = 10;
        this.searchCriteria = criteria;
        this.httpService.post(HttpUrlService.hardwareManagement.GetHardwareList, this.searchCriteria).subscribe(response => {
            if (this.hardwareList === undefined)
                this.hardwareList = [];
            this.hardwareList = response.json();
            this.customPageSetter();
            this.dataSource = new MatTableDataSource(this.hardwareList);
            this.dataSource.paginator = this.paginator;
            this.customPageSetter();

        }, error => {
            this.dataSource = new MatTableDataSource(this.hardwareList);
            this.dataSource.paginator = this.paginator;
        })
    }


    details(id:number) 
    {
        debugger;
        this.dialogRef = this.dialog.open(HardwareDetailsDialogComponent, {
            data: {id:id},
            // height: '400px',
            // width: '600px',
        });
    }
}

@Component({
    selector: 'dialog-elements-example-dialog',
    templateUrl: './hardware-details/hardware-details.component.html',
    styleUrls: ['./hardware-details/hardware-details.component.scss'],
    animations: fuseAnimations
})
export class HardwareDetailsDialogComponent implements OnInit {
    deviceId:number;
    hardwareProperties:Array<any>;
    /**
     *
     */
    constructor(public dialogRef: MatDialogRef<HardwareDetailsDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any,private httpService: CustomHttpService) {
        this.deviceId = data.id;
    }

    ngOnInit(){
        this.httpService.get(HttpUrlService.hardwareManagement.GetHardware,this.deviceId).subscribe(response => {
            let result = response.json();
            this.hardwareProperties = response.json();
        })
    }
}