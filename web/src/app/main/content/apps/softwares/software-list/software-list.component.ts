import { Component, OnInit } from '@angular/core'
import { Page } from '../../../../../shared/models/common/page.model';
import { SoftwareSearchCriteria } from '../../../../../shared/models/shared/SearchCriteria';
import { HelperService } from '../../../../../../app/services/helper.service';
import { CustomHttpService } from '../../../../../services/custom.service';
import { HttpUrlService } from '../../../../../services/http.url.service';

@Component({
    selector: 'software-list',
    styleUrls: [],
    templateUrl: './software-list.component.html'
})
export class SoftwareListComponent implements OnInit {
    softwareList: Array<any>;
    page = new Page();
    searchCriteria = new SoftwareSearchCriteria();
    displayedColumns = ['softwareName', 'softwareType', 'uniqueId', 'sNo', 'warranty', 'buttons'];
    /**
     *
     */
    constructor(private httpService: CustomHttpService) {

    }


    ngOnInit() {
        this.page.pageNumber = 0;
        this.page.size = 10;
        let criteria = new SoftwareSearchCriteria();
        criteria.pageNumber = 1; criteria.pageSize = 10;

        this.httpService.post(HttpUrlService.softwareManagement.Search, this.searchCriteria, ).subscribe(response => {
            this.softwareList = response.json();
            this.page = HelperService.customPageSetter(this.page, this.softwareList);
        })
    }

    edit(name: string, id: number) {

    }

    onHardwarSeach(criteria: any) {debugger
        this.httpService.post(HttpUrlService.softwareManagement.Search, criteria).subscribe(response => {
            debugger;
            this.softwareList = response.json();
            this.page = HelperService.customPageSetter(this.page, this.softwareList);
        })
    }

    setPage(pageInfo) {
        this.searchCriteria = HelperService.setPage(pageInfo, this.searchCriteria);
    }
}