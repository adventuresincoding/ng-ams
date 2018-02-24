import { Component, ViewEncapsulation, OnInit, EventEmitter, Output } from '@angular/core'
import { HardwareSearchCriteria, SearchCriteria } from '../../../../../../shared/models/shared/SearchCriteria'

@Component({
    selector: 'hardware-search',
    styleUrls: [],
    templateUrl: './hardware-search.component.html'
})
export class HardwareSearchComponent implements OnInit {

    @Output() onSearch: EventEmitter<any> = new EventEmitter<any>();
    searchCriteria = new HardwareSearchCriteria();
    hardwareList = [
        { text: 'RAM', value: 1 },
        { text: 'Motherboard', value: 2 },
        { text: 'Processor', value: 3 },
        { text: 'Harddisk', value: 4 },
        { text: 'Others', value: 5 },
    ]
    /**
     *
     */
    constructor() {
    }

    ngOnInit() {

    }

    searchHardware() {        
        this.onSearch.emit(this.searchCriteria);
    }
}