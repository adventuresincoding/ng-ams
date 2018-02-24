import { Component, OnInit, AfterViewInit, ViewChild, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatSort, MatTableDataSource, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import { Desk } from '../../../../../shared/models/desk/desk.model';
import { CustomHttpService } from '../../../../../services/custom.service';
import { HttpUrlService } from '../../../../../services/http.url.service';
import { DeskSearchCriteria } from '../../../../../shared/models/shared/SearchCriteria';
import { fuseAnimations } from '../../../../../core/animations';
import { DeskDetailsDialogComponent } from '../desk-details/desk-details.component';
import { Router } from '@angular/router';
import { AlertComponent } from '../../../../shared/alert.component';


@Component({
    selector: 'desk-list',
    styleUrls: ['./desk-list.component.scss'],
    templateUrl: './desk-list.component.html'
})
export class DeskListComponent {
    // displayedColumns = ['created', 'state', 'number', 'title'];
    displayedColumns = ['deskNo', 'location', 'assignedTo', 'computerName', 'buttons'];
    exampleDatabase: ExampleHttpDao | null;
    dataSource = new MatTableDataSource();

    resultsLength = 0;
    isLoadingResults = false;
    isRateLimitReached = false;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    detailDialogRef:any;

    /**
     *
     */
    constructor(private http: HttpClient, private httpService: CustomHttpService,
        private detailsDialog:MatDialog,private _router:Router,private dialog:MatDialog) {

    }

    // ngOnInit() {

    // }

    ngAfterViewInit() {
        this.exampleDatabase = new ExampleHttpDao(this.http, this.httpService);


        // If the user changes the sort order, reset back to the first page.
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

        this.searchDesk(null);
    }

    searchDesk(criteria: DeskSearchCriteria) {
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

        Observable.merge(this.sort.sortChange, this.paginator.page)
            .startWith(null)
            .switchMap(() => {
                setTimeout(() => {
                    this.isLoadingResults = true;
                });
                criteria = criteria == null ? new DeskSearchCriteria() : criteria;
                criteria.pageSize = this.paginator.pageSize;
                let pageIndex = +this.paginator.pageIndex;
                criteria.pageNumber = pageIndex + 1;
                return this.exampleDatabase!.searchDesk(criteria)
            })
            .map(data => {debugger;
                setTimeout(() => {
                    this.isLoadingResults = false;
                    this.isRateLimitReached = false;
                });
                let result = data.json();
                console.log(result);
                this.resultsLength = result.length > 0 ? result[0].totalCount : 0;
                return result;
            })
            .catch(() => {
                setTimeout(() => {
                    this.isLoadingResults = false;
                    // Catch if the GitHub API has reached its rate limit. Return empty data.
                    this.isRateLimitReached = true;
                });
                return Observable.of([]);
            }).subscribe(data => {
                // console.log(this.isLoadingResults)
                console.log('Is laoding result from subscribe:' + this.isLoadingResults)
                this.dataSource.data = data
            });
    }

    /**
     * Navigate to edit the user
     */
    editDesk(deskId:number){
        this._router.navigate(['/desk/edit/',deskId]).then(response => {            
        }).catch(exception => {
            let dialogRef = this.dialog.open(AlertComponent, {
                width: '250px',
                data: {}
            });
        });
    }

    /**
     * display desk details..
     * @param id 
     */
    details(id:number) 
    {
        debugger;
        this.detailDialogRef = this.detailsDialog.open(DeskDetailsDialogComponent, {
            data: {id:id},
            height: '400px',
            width: '850px',
        });
    }
}

/** An example database that the data source uses to retrieve data for the table. */
export class ExampleHttpDao {
    constructor(private http: HttpClient, private httpService: CustomHttpService) {
    }

    searchDesk(criteria: DeskSearchCriteria): Observable<any> {
        if (criteria == null) {
            criteria = new DeskSearchCriteria();
        }
        return this.httpService.post(HttpUrlService.deskManagement.DeskSearch, criteria);
    }
}