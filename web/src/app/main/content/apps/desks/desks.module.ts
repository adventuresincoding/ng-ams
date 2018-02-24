import { Injectable, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../../../core/modules/shared.module';
import { DesksComponent } from './desks.component';
import { AuthGuard } from '../../../../services/auth.guard'
import { DeskComponent } from './desk/desk.component';
import { DeskListComponent } from './desk-list/desk-list.component';
import { DeskSearchComponent } from './desk-search/desk-search.component';
import { LookupService } from '../../../../services/lookup-service';
import { DeskDetailsDialogComponent } from './desk-details/desk-details.component';
import { DeskAssignComponent } from './desk-assign/desk-assign.component';
import { SoftwareAssignComponent } from './software-assign/software-assign.component';

const routes: Routes = [
    {
        path: '', component: DesksComponent, canActivate: [AuthGuard],
        resolve: {
            desk: LookupService
        },
        children: [
            { path: 'manage', component: DeskComponent },
            { path: 'search', component: DeskListComponent },
            { path: 'assign/desk', component: DeskAssignComponent },
            { path: 'edit/:id', component:DeskComponent},
            { path: 'assign/software', component: SoftwareAssignComponent },
            { path: '', redirectTo: 'search', pathMatch: 'full' }
        ]
    }
]

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    providers: [],
    declarations: [DesksComponent, DeskComponent, DeskListComponent, DeskSearchComponent, 
        DeskDetailsDialogComponent, DeskAssignComponent,SoftwareAssignComponent],
    entryComponents: [DeskDetailsDialogComponent]
})
export class DesksModule { }