import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { fuseAnimations } from '../../../../core/animations';

@Component({
    selector: 'softwares',
    styleUrls: [],
    templateUrl: './softwares.component.html',
    animations:fuseAnimations
})
export class SoftwaresComponent {

    /**
     *
     */
    constructor(private location: Location) {

    }

    goBack() {
        this.location.back();
    }
}