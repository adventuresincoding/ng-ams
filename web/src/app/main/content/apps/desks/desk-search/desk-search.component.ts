import { Component, Output, EventEmitter } from '@angular/core';
import { DeskSearchCriteria } from '../../../../../shared/models/shared/SearchCriteria';
import { LookupService } from '../../../../../services/lookup-service';

@Component({
    selector: 'desk-search',
    styleUrls: [],
    templateUrl: './desk-search.component.html'
})
export class DeskSearchComponent {
    @Output() onDeskSearch = new EventEmitter<any>();
    desk = new DeskSearchCriteria();
    locationList: any;
    /**
     *
     */
    constructor(private lookupService: LookupService) {
        this.lookupService.lookupDataChange.subscribe(response => {
            let result = this.lookupService.lookupData;

        })

        if (this.lookupService.lookupData !== null) {
            let result = this.lookupService.lookupData;
            this.locationList = result.locationList;
        }
    }

    deskSearchEmitter() {debugger;
        this.onDeskSearch.emit(this.desk);
    }
}