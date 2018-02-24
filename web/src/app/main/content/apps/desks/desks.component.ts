import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '../../../../core/animations';
import { Location } from '@angular/common';

@Component({
    selector: 'desks',
    styleUrls: [],
    templateUrl: './desks.component.html',
    animations: fuseAnimations
})
export class DesksComponent implements OnInit {

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