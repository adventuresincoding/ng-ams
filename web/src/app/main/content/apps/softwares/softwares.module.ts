import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../core/modules/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { SoftwaresComponent } from './softwares.component';
import { SoftwareComponent } from './software/software.component';
import { SoftwareListComponent } from './software-list/software-list.component';
import { SoftwareSearchComponent } from './software-search/software-search.component';


const routes: Routes = [
    {
        path: '', component: SoftwaresComponent,
        children: [
            { path: 'list', component: SoftwareListComponent },
            { path: 'manage', component: SoftwareComponent },
            { path: 'search', redirectTo: 'list'},
            { path: '', redirectTo: 'list',pathMatch:'full' },
        ]
    }
]

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    declarations: [SoftwareComponent, SoftwaresComponent,SoftwareListComponent,SoftwareSearchComponent],
    providers: [],
    entryComponents: []
})
export class SoftwaresModule {

}