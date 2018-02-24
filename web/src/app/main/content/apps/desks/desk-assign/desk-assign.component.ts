import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { HttpUrlService } from '../../../../../services/http.url.service';
import { CustomHttpService } from '../../../../../services/custom.service';
import { DeskWithHardware } from '../../../../../shared/models/desk/configured.desk';
import { EmployeeAssignedDesk } from '../../../../../shared/models/desk/employee-desk-assigned.model';
import { Employee } from '../../../../../shared/models/employee/employee.model';
import { error } from 'selenium-webdriver';
import { MatDialog } from '@angular/material';
import { AlertComponent } from '../../../../shared/alert.component';

@Component({
    selector: 'desk-assign',
    styleUrls: ['./desk-assign.component.scss'],
    templateUrl: './desk-assign.component.html'
})
export class DeskAssignComponent implements OnInit {
    stateCtrl: FormControl; employeeCtrl: FormControl;
    filteredStates: Observable<any[]>;
    filteredEmployees: Observable<any[]>;
    states: any[] = [
        {
            name: 'Arkansas',
            population: '2.978M',
            // https://commons.wikimedia.org/wiki/File:Flag_of_Arkansas.svg
            flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arkansas.svg'
        },
        {
            name: 'California',
            population: '39.14M',
            // https://commons.wikimedia.org/wiki/File:Flag_of_California.svg
            flag: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg'
        },
        {
            name: 'Florida',
            population: '20.27M',
            // https://commons.wikimedia.org/wiki/File:Flag_of_Florida.svg
            flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Florida.svg'
        },
        {
            name: 'Texas',
            population: '27.47M',
            // https://commons.wikimedia.org/wiki/File:Flag_of_Texas.svg
            flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Texas.svg'
        }
    ];
    employees: any[];
    hardConfigurationList: any;
    desk: any;
    deskAssigned = new EmployeeAssignedDesk();
    displayEmpDetails?: boolean;
    displayInfo: boolean;
    isLoadingResults = false;
    isRateLimitReached = false;

    /**
     *
     */
    constructor(private http: CustomHttpService, public dialog: MatDialog) {
        this.stateCtrl = new FormControl(); this.employeeCtrl = new FormControl();
    }

    ngOnInit() {
        this.filteredStates = this.stateCtrl.valueChanges
            .startWith(null)
            .map(state => state ? this.filterDesk(state) : this.states.slice());

        this.filteredEmployees = this.employeeCtrl.valueChanges.startWith(null)
            .map(employee => this.filterEmployee(employee))
        // .map(employee => employee ? this.filterEmployee(employee) : this.employees.slice());
    }

    filterDesk(name: string) {
        let result = [];
        this.http.get(HttpUrlService.deskManagement.AutoCompleteDeskNoSearch, name).subscribe(response => {
            debugger;
            this.states = [];
            result = response.json();
            for (let key in result) {
                let state = { name: result[key], deskId: key, population: '20.27M', flag: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg' };
                this.states.push(state);
            }
            return this.states;
        })
        return this.states;
        // return this.states.filter(state =>
        //     state.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
    }

    filterEmployee(name: string) {
        let result = [];
        this.http.get(HttpUrlService.deskManagement.AutoCompleteEmployeeSearch, name).subscribe(response => {
            this.employees = [];
            result = response.json();
            this.employees = result;
            return this.employees;
        })
        return this.employees;
    }

    /** Gets desl details when a value is selected after autocomplete */
    getDeskDetails(state: any) {
        this.isLoadingResults = true;
        this.http.get(HttpUrlService.deskManagement.Get, state.deskId).map(response => {
            return response.json()
        }).subscribe((response: DeskWithHardware) => {
            debugger
            this.hardConfigurationList = response;
            if (this.hardConfigurationList) {
                this.desk = this.hardConfigurationList.desk;
            }
            this.displayInfo = true;
            console.log(this.hardConfigurationList);
        }, error => {

        }, () => {
            this.isLoadingResults = false;
        });
        this.deskAssigned.deskId = state.deskId;
    }

    getEmployeeDetails(emp: Employee) {
        this.displayEmpDetails = true;
        this.deskAssigned.employeeId = emp.employeeId;
    }

    onSubmit() {
        this.isLoadingResults = true;
        this.http.post(HttpUrlService.deskManagement.AssignDesk, this.deskAssigned).map(response => {
            return response.json()
        }).subscribe((response: Array<DeskWithHardware>) => {
            let dialogRef = this.dialog.open(AlertComponent, {
                width: '250px',
                data: {}
            });
        }, error => {

        }, () => {
            this.isLoadingResults = false;
        })
    }

    step = 0;

    setStep(index: number) {
        this.step = index;
    }

    nextStep() {
        this.step++;
    }

    prevStep() {
        this.step--;
    }
}