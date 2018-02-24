import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Hardware } from '../../../../../shared/models/hardware/hardware';
import { Desk, DeskAssignedDevice, DeskConfigViewModel } from '../../../../../shared/models/desk/desk.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import { CustomHttpService } from '../../../../../services/custom.service';
import { HttpUrlService } from '../../../../../services/http.url.service';
import { MatTableDataSource } from '@angular/material';
import { LookupService } from '../../../../../services/lookup-service';
import { AlertComponent } from '../../../../../../app/main/shared/alert.component';
import { ActivatedRoute } from '@angular/router';


@Component({
    selector: 'desk',
    styleUrls: ['./desk.component.scss'],
    templateUrl: './desk.component.html'
})
export class DeskComponent implements OnInit {
    hardware = new Hardware();
    deskForm: FormGroup;
    deskDetailForm: FormGroup;
    dynamicDeviceForm: FormGroup;
    deskConfigList = new Array<DeskConfigViewModel>();
    desk = new Desk();
    assignedDevicesList = new Array<DeskAssignedDevice>();
    filteredStates: Observable<any[]>;
    stateCtrl: FormControl
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
    processorList: any[];
    displayedColumns = ['deviceName', 'hardwareList'];
    locationList: any;

    private objList = [];

    dataSource = new MatTableDataSource<any>(this.deskConfigList);
    isLoadingResults = false;
    isRateLimitReached = false;
    deskId:number;

    /**
     *
     */
    constructor(private fb: FormBuilder, private httpService: CustomHttpService, private lookupService: LookupService,
        public dialog: MatDialog,private route:ActivatedRoute) {
        this.stateCtrl = new FormControl();

        this.lookupService.lookupDataChange.subscribe(response => {
            let result = this.lookupService.lookupData;

        })

        if (this.lookupService.lookupData !== null) {
            let result = this.lookupService.lookupData;
            this.locationList = result.locationList;
        }
    }

    ngOnInit() {
        this.deskDetailForm = this.fb.group({
            deskNo: ['', [Validators.required]],
            computerName:['',[Validators.required]],
            location: ['', [Validators.required]],
        });

        this.dynamicDeviceForm = this.fb.group({

        });

        this.deskForm = this.fb.group({
            deskDetailForm: this.deskDetailForm,
            dynamicDeviceFormList: this.dynamicDeviceForm
        });

        this.filteredStates = this.stateCtrl.valueChanges
            .startWith(null)
            .map(state => state ? this.filterProcessor(state) : this.states.slice());

        this.httpService.getAll(HttpUrlService.deskManagement.Get).subscribe(response => {
            let result = response.json();
            this.deskConfigList = result;
            this.dataSource = new MatTableDataSource<any>(this.deskConfigList);
            this.addDynamicFormControl(this.deskConfigList);
        })
        

        this.route.params.filter((params) => {
            return params != null;
        }).subscribe(params => {
            this.deskId = +params['id'];
            if(this.deskId){
                this.httpService.get(HttpUrlService.deskManagement.GetDeskById,this.deskId).subscribe(response => {
                    this.desk = response.json();
                    console.log(response.json());
                })
            }
        })
    }


    filterProcessor(name: string) {
        return this.states.filter(state =>
            state.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
    }

    /**
     * Dynamically add controls to form group
     * @param deviceList 
     */
    addDynamicFormControl(deviceList: Array<any>) {
        this.dynamicDeviceForm = new FormGroup({});

        for (let device of deviceList) {
            let control: FormControl = new FormControl(device.deviceName, Validators.required);
            this.dynamicDeviceForm.addControl(device.deviceName, control);
        }

        this.deskForm = this.fb.group({
            deskDetailForm: this.deskDetailForm,
            dynamicDeviceFormList: this.dynamicDeviceForm
        });
    }

    /**
     * Configures a desk. Assigns devices.
     */
    onSubmit() {
        let selectedDevicesList = Array<DeskAssignedDevice>();
        for (let i = 0; i < this.deskConfigList.length; i++) {
            let objSelectedDevice = new DeskAssignedDevice();
            //selectedFeatures.featureId = this.lookupTypes[i].assetLookupTypesFeature.filter(f => f.selected === true)[0].featureId;
            objSelectedDevice.deviceId = this.deskConfigList[i].hardwareList.filter(f => f.selected == true)[0].deviceId;
            selectedDevicesList.push(objSelectedDevice);
        }       
        this.desk.assignedDevices = selectedDevicesList;

        Observable.merge().startWith(null)
            .switchMap(() => {
                setTimeout(() => {
                    this.isLoadingResults = true;
                });
                return this.httpService.post(HttpUrlService.deskManagement.Add, this.desk);
            }).map(data => {
                setTimeout(() => {
                    this.isLoadingResults = false;
                });
                return data.json();
            })
            .catch(() => {
                setTimeout(() => {
                    this.isLoadingResults = false;
                    let dialogRef = this.dialog.open(AlertComponent,{
                        width:'250px',
                        data:{
                            message:'Oops something went wrong.' //This should come dynamically.
                        }
                       });
                });
                return Observable.of([]);
            })
            .subscribe(response => {
               let dialogRef = this.dialog.open(AlertComponent,{
                width:'250px',
                data:{
                    message:'Data saved succesfully.' //This should come dynamically.
                }
               });
               this.deskDetailForm.reset();
            })      
    }

    onDeviceChange(selectedDeviceId: number, assignedDevice: any) {
        for (let selectedDevice of assignedDevice) {
            assignedDevice.find(x => x.deviceId === selectedDevice.deviceId);
        }
        for (let i = 0; i < assignedDevice.length; i++) {
            assignedDevice[i].selected = assignedDevice[i].deviceId === selectedDeviceId ? true : false;
        }
    }

}