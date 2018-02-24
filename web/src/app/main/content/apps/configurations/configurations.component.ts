import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '../../../../core/animations';
import { Location } from '@angular/common';

@Component({
    selector: 'configs',
    styleUrls: [],
    templateUrl: './configurations.component.html',
    animations: fuseAnimations
})
export class ConfigurationsComponent implements OnInit {
    /**
     *
     */
    constructor(private location: Location) {

    }

    ngOnInit() {

    }

    goBack() {
        this.location.back();
    }
}