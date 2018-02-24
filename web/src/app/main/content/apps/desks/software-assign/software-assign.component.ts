import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import { HttpUrlService } from '../../../../../services/http.url.service';
import { CustomHttpService } from '../../../../../services/custom.service';
import { fuseAnimations } from '../../../../../core/animations';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { SoftwareSearchCriteria } from '../../../../../shared/models/shared/SearchCriteria';
import { SoftwareAssigned } from '../../../../../shared/models/software/software-assigned.model';
import { Desk } from '../../../../../shared/models/desk/desk.model';
import { AlertComponent } from '../../../../shared/alert.component';

@Component({
    selector: '',
    styleUrls: ['./software-assign.component.scss'],
    templateUrl: 'software-assign.component.html',
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class SoftwareAssignComponent implements OnInit {
    computerList: any;
    deskCtrl: FormControl;
    softwareCtrl: FormControl;
    computerCtrl: FormControl;
    filteredSoftwares: Observable<any[]>;
    filteredDesk: Observable<any[]>;
    filteredComputers: Observable<any[]>;
    deskList: any[];
    softwareList: any[];
    dataSource = new MatTableDataSource();
    displayedColumns = ['checkbox', 'name', 'buttons']
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    isLoadingResults = false;
    isRateLimitReached = false;
    searchCriteria = new SoftwareSearchCriteria();
    checkboxes: {};
    assignedList = Array<SoftwareAssigned>();
    desk = new Desk();
    /**
     *
     */
    constructor(private http: CustomHttpService, public dialog: MatDialog) {
        this.deskCtrl = new FormControl();
        this.softwareCtrl = new FormControl();
        this.computerCtrl = new FormControl();
    }

    ngOnInit() {

        /**
         * On page load gets list of all available softwares.
         */
        this.http.post(HttpUrlService.softwareManagement.Search, this.searchCriteria).mergeMap((response) => {
            let result = response.json();
            return result;
        }).map((software: SoftwareAssigned) => {
            software.isAssigned = false;
            return software;
        }).subscribe((response: any) => {
            if (this.softwareList) {
            }
            else {
                this.softwareList = Array<any>();

            }
            this.softwareList.push(response);
        }, error => { }, () => {
            this.dataSource.data = this.softwareList;
        })

        this.filteredDesk = this.deskCtrl.valueChanges.startWith(null).map(desk => this.filterDesk(desk));

        // this.filteredSoftwares = this.softwareCtrl.valueChanges.startWith(null).map(software => this.filteredSoftware(software));

        this.filteredComputers = this.computerCtrl.valueChanges.startWith(null).map(c => this.filterComputer(c));
    }

    filterDesk(name: string) {
        let result = [];
        this.http.get(HttpUrlService.deskManagement.AutoCompleteDeskNoSearch, name).subscribe(response => {
            this.deskList = [];
            result = response.json();
            for (let key in result) {
                let state = { name: result[key], deskId: key, population: '20.27M', flag: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg' };
                this.deskList.push(state);
            }
            return this.deskList;
        })
        return this.deskList;
    }

    // filteredSoftware(name: string) {
    //     let result = [];
    //     this.http.get(HttpUrlService.deskManagement.AutoCompleteDeskNoSearch, name).subscribe(response => {
    //         this.softwareList = [];
    //         result = response.json();
    //         for (let key in result) {
    //             let software = { name: result[key], deskId: key, population: '20.27M', flag: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg' };
    //             this.softwareList.push(software);
    //         }
    //         return this.softwareList;
    //     })
    //     return this.softwareList;
    // }

    filterComputer(name: string) {
        let result = [];
        this.http.get(HttpUrlService.deskManagement.AutoCompleteComputerSearch, name).subscribe(response => {
            result = response.json();
            this.computerList = [];
            for (let key in result) {
                let comp = { name: result[key], deskId: key, population: '20.27M', flag: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg' };
                this.computerList.push(comp);
            }
        })
        return this.computerList;
    }
    /**
     * Calls when a computer is selected in Autocomplete.
     * @param desk 
     */
    getSoftwareDetails(desk) {
        this.isLoadingResults = true;
        this.http.get(HttpUrlService.deskManagement.GetSoftwareAssignedList, desk.deskId).subscribe(response => {
            let result = response.json();
            this.checkAssignedSoftware(result);
        }, error => {
            this.isLoadingResults = false;
        }, () => {
            this.isLoadingResults = false;
        })
        this.desk.deskId = desk.deskId;
    }

    onSelectedChange(softwareId: number, event) {
        if (event.checked) {
            let assignedSofware = { softwareId: softwareId, isActive: true, deskId: this.desk.deskId }
            this.assignedList.push(assignedSofware);
        }
        else {
            let software = this.assignedList.find(p => p.softwareId === softwareId);
            let index = this.assignedList.indexOf(software);
            this.assignedList.splice(index, 1);
        }
    }

    onSubmit() {
        this.isLoadingResults = true;
        this.http.post(HttpUrlService.deskManagement.AssignSoftware, this.assignedList).subscribe(response => {
            let dialogRef = this.dialog.open(AlertComponent, {
                width: '250px',
                data: {}
            });
            this.assignedList=[];
            this.computerCtrl.reset();
            this.softwareList.forEach(function(software,index,array){
                array[index].isAssigned = false;
            })

        }, error => {

            this.isLoadingResults = false;
        }, () => {
            this.isLoadingResults = false;
        })
    }

    checkAssignedSoftware(assignedSoftwareList: any) 
    {
        for(let i = 0; i < this.softwareList.length; i++)
        {
            let assignedSoftware = assignedSoftwareList.find(p => p.softwareId === this.softwareList[i].softwareId);
            if(assignedSoftware)
            {
                this.softwareList[i].isAssigned = true;
                // let soft = this.softwareList
                // assignedSoftware.isAssigned = true;
                // this.softwareList[i] = assignedSoftware;
            }
            else
            {
                this.softwareList[i].isAssigned = false;
            }       
        }
        console.log(this.softwareList);
        this.dataSource.data  = this.softwareList;
    }
}