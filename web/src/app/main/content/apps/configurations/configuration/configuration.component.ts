import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Hardware } from '../../../../../shared/models/hardware/hardware';

@Component({
    selector: 'config',
    styleUrls: [],
    templateUrl: './configuration.component.html'
})
export class ConfigurationComponent implements OnInit {
    hardwareForm: FormGroup;
    hardware = new Hardware();
    /**
     *
     */
    constructor(private fb: FormBuilder) {

    }

    onSubmit(){
        
    }

    ngOnInit() {
        this.hardwareForm = this.fb.group({
            hardwareName: ['', [Validators.required]]
        })
    }
}