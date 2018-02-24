import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { SoftwareSearchCriteria } from '../../../../../shared/models/shared/SearchCriteria'


@Component({
    selector: 'software-search',
    styleUrls: [],
    templateUrl: './software-search.component.html'
})
export class SoftwareSearchComponent implements OnInit {
    searchCriteria = new SoftwareSearchCriteria();
    @Output() onSearch = new EventEmitter<any>();
    softwareType: Array<any>;
    departmentType: Array<any>;
    /**
     *
     */
    constructor() {

    }

    ngOnInit() {
        this.softwareType = [
            { value: 1, viewValue: 'Operating System' },
            { value: 2, viewValue: 'Application Development Tool' },
            { value: 3, viewValue: 'Database' }
        ];

        this.departmentType = [
            { value: 1, viewValue: 'Java' },
            { value: 2, viewValue: '.Net' },
            { value: 3, viewValue: 'PHP' },
            { value: 4, viewValue: 'Others' }
        ]
    }

    searchSoftware() {
        this.onSearch.emit(this.searchCriteria);
    }
}