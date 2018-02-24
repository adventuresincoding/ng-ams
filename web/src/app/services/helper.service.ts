import { Injectable } from '@angular/core';
import { Page } from './../shared/models/common/page.model'

@Injectable()
export class HelperService {
    static page = new Page();

    static customPageSetter(page: Page, objList: any, ): Page {
        page.pageNumber = 1;
        let totalElements = objList.length > 0 ? objList[0].totalCount : 0;
        let totalPages = Math.floor(totalElements / page.size);
        totalPages = (totalElements % page.size) > 0 ? totalPages + 1 : totalPages;
        if (totalElements > 0 && totalElements < page.size) {
            totalPages = 1;
        }
        page = { size: page.size, totalElements: totalElements, totalPages: totalPages, pageNumber: 0 };
        return page;
    }

    static setPage(pageInfo, searchCriteria: any): any {
        searchCriteria.pageNumber = pageInfo.offset + 1;
        searchCriteria.pageSize = 10;
        return searchCriteria;
    }
}