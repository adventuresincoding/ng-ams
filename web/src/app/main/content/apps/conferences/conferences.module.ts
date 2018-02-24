import { NgModule } from "@angular/core";
import { Routes, Router, RouterModule } from "@angular/router";
import { AuthGuard } from "../../../../services/auth.guard";
import { SharedModule } from "../../../../core/modules/shared.module";
import { ConferenceComponent } from "./conference/conference.component";
import { ConferencesComponent } from "./conferences.component";
import { ConferenceListComponent } from "./conference-list/conference-list.component";

const route: Routes = [
    {
        path: '', component: ConferencesComponent, canActivate: [AuthGuard],
        children: [
            { path: 'list', component: ConferenceListComponent },
            { path: '', redirectTo: '' },
        ]
    }
]

@NgModule({
    imports: [
        SharedModule, RouterModule.forChild(route)
    ],
    providers: [],
    declarations: [ConferencesComponent, ConferenceComponent, ConferenceListComponent],
    entryComponents: []
})
export class ConferencesModule {

}