import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { DeviceHardware } from '../../../../../shared/models/hardware/hardware.model';
import { HardwareProperties } from '../../../../../shared/models/hardware/hardware.properties.model';
import { CustomHttpService } from '../../../../../services/custom.service';
import { HttpUrlService } from '../../../../../services/http.url.service';
import { HardwareFeature } from '../../../../../shared/models/hardware/hardware.feature';
import { AssetLookupTypesFeature, AssetLookupType, AssetLookup } from '../../../../../shared/models/lookup/lookup.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/merge';

@Component({
  selector: 'hardware',
  styles: ['./hardware.component.scss'],
  templateUrl: './hardware.component.html'
})
export class HardwareComponent implements OnInit {
  hardwareForm: FormGroup;
  dynamicFeatures: FormGroup;
  hardwareFormGroup: FormGroup;
  formControl: FormControl;
  formErrors: any;
  hardware = new DeviceHardware();
  hardwarePropertiesList = [];
  hardwareList = [];
  startDate: Date;
  favoriteSeason: string;
  seasons = [];
  lookupTypes: any;
  feature = new HardwareFeature();
  featuresList: Array<HardwareFeature>;

  constructor(private fb: FormBuilder, private httpService: CustomHttpService) {
    this.hardwareList = [
      { text: 'RAM', value: 1 },
      { text: 'Motherboard', value: 2 },
      { text: 'Processor', value: 3 },
      { text: 'Harddisk', value: 4 },
      { text: 'Others', value: 5 },
    ]
  }

  ngOnInit() {
    this.formControl = new FormControl('');
    this.hardwareFormGroup = this.fb.group({
      hardwareType: ['', [<any>Validators.required]],
      brand: ['', [<any>Validators.required]],
      sNo: ['', [<any>Validators.required]],
      uniqueId: ['', [<any>Validators.required]],
      warranty: [null, [<any>Validators.nullValidator]],
      description: ['', [<any>Validators.nullValidator]],
    })
    //this.hardwareForm = this.fb.group({
    //  hardwareType: ['', [<any>Validators.required]],
    //  brand: ['', [<any>Validators.required]],
    //  sNo: ['', [<any>Validators.required]],
    //  uniqueId: ['', [<any>Validators.required]],
    //  warranty: [null, [<any>Validators.nullValidator]],
    //  description: ['', [<any>Validators.nullValidator]],
    //  dynamicFeatures: this.fb.group({})
    //});
    this.hardwareForm = this.fb.group({
      hardwareFormGroup: this.hardwareFormGroup,
      dynamicFeatures: this.dynamicFeatures
    })
    //this.hardwareForm = this.initFeatures();
    this.startDate = new Date(2018, 0, 1);
    this.formErrors = {
      hardwareType: {},
      brand: {},
      sNo: {},
      uniqueId: {},
      warranty: {},
      description: {},
      size: {}
    }

    /**
     * Get lookup for Hardware
     */

    this.httpService.get(HttpUrlService.hardwareManagement.GetHardwareType, 0).subscribe(response => {
      let result = response.json();
      this.hardwareList = [];
      for (let i = 0; i < result.length; i++)
      {
        this.hardwareList.push({value:result[i].lookupId,text:result[i].lookupName})
      }
      // this.hardwareList = response.json();
    }, error => {
        console.log(error);
      })
  }

  /**
   * Submits the forms
   */
  onSubmit() {
    debugger;
    let objFeaturesList = [];
    for (let i = 0; i < this.lookupTypes.length; i++) {
      let selectedFeatures: HardwareFeature = new HardwareFeature();
      selectedFeatures.featureId = this.lookupTypes[i].assetLookupTypesFeature.filter(f => f.selected === true)[0].featureId;
      objFeaturesList.push(selectedFeatures);
    }
    this.hardware.hardwareFeature = objFeaturesList;

    this.httpService.post(HttpUrlService.hardwareManagement.AddHardware, this.hardware).subscribe(response => {
      console.log('success');
    }, error => {
      console.log(error);
    })
  }

  /**
   * Gets list of features for a device
   * calls method to dynamically add controls to form...
   * @param deviceTypeId 
   */
  getDeviceTypeList(deviceTypeId: number) {
    if (!deviceTypeId)
      return false;
    this.httpService.get(HttpUrlService.hardwareManagement.GetDeviceLookupList, deviceTypeId).subscribe(response => {
      this.lookupTypes = response.json();
      this.hardware.hardwareType = deviceTypeId;

      this.addFormControl(this.lookupTypes);

    }, error => {
      console.log('oops something went wrong');
    })
  }

  /**
   * Dynamically adds list of controls to a form and calls method to intialize the form again.
   * Called when Device Type is changed.
   * @param featuresList 
   */
  addFormControl(featuresList: any) {
    this.dynamicFeatures = new FormGroup({});
    for (let feature of featuresList) {
      let control: FormControl = new FormControl(feature.lookupTypeName, Validators.required);
      this.dynamicFeatures.addControl(feature.lookupTypeName, control);
    }
    this.hardwareForm = this.fb.group({
      hardwareFormGroup: this.hardwareFormGroup,
      dynamicFeatures: this.dynamicFeatures
    })

    //this.hardwareForm = this.initFeatures();
  }

  /**
   * Initializes a form group
   */
  initFeatures() {
    return this.fb.group({
      hardwareType: ['', [<any>Validators.required]],
      brand: ['', [<any>Validators.required]],
      sNo: ['', [<any>Validators.required]],
      uniqueId: ['', [<any>Validators.required]],
      warranty: [null, [<any>Validators.nullValidator]],
      description: ['', [<any>Validators.nullValidator]],
      dynamicFeatures: this.dynamicFeatures
    });
  }

  /**
   * Assigns selected features to model on feature selection.
   * @param featureId 
   * @param lookup 
   */
  setFeature(featureId: number, lookup: AssetLookupType) {
    debugger;
    for (let i = 0; i < lookup.assetLookupTypesFeature.length; i++) {
      lookup.assetLookupTypesFeature[i].selected = lookup.assetLookupTypesFeature[i].featureId == featureId ? true : false;
    }
  }
}
