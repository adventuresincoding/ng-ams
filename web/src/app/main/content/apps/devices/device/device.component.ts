import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Device } from '../../../../../shared/models/device/device.model'
import { HttpUrlService } from '../../../../../services/http.url.service';
import { CustomHttpService } from '../../../../../services/custom.service';

@Component({
  selector: 'device',
  styleUrls: [],
  templateUrl: './device.component.html'
})
export class DeviceComponent implements OnInit {
  device = new Device();
  formErrors: any;
  deviceForm: FormGroup;
  private formControl: FormControl;
  deviceList = [];
  brandList = [];
  /**
   *
   */
  constructor(private fb: FormBuilder, private httpService: CustomHttpService) {
    this.formControl = new FormControl('');
    this.deviceList = [
      { text: 'CPU', value: 1 },
      { text: 'Monitor', value: 2 },
      { text: 'Mouse', value: 3 },
      { text: 'Keyboard', value: 4 },
      { text: 'Printer', value: 5 },
      { text: 'Scanner', value: 6 },
      { text: 'Other', value: 7 },
    ];
    this.brandList = [
      { text: 'Lenove', value: 1 },
      { text: 'Acer', value: 2 },
      { text: 'Dell', value: 3 },
    ]
  }

  ngOnInit() {
    this.deviceForm = this.fb.group({
      deviceType: ['', [<any>Validators.required]],
      brand: ['', [<any>Validators.nullValidator]],
      modelNo: ['', [<any>Validators.required]],
      uniqueId: ['', [<any>Validators.required]],
      warranty: [null, [<any>Validators.required]],
      description: ['', [<any>Validators.nullValidator]]
    });

    this.formErrors = {
      deviceType: {},
      modelNo: {},
      warranty: {},
      uniqueId: {}
    }
  }

  onSubmit() {
    debugger;
    this.httpService.post(HttpUrlService.deviceManagement.AddDevice, this.device).subscribe((response) => {
      console.log(response);
    })
  }
}
