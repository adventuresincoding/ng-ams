import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfigurationsComponent } from './configurations.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { SharedModule } from '../../../../core/modules/shared.module';


const routes: Routes = [
    {
        path: '', component: ConfigurationsComponent,
        children: [
            { path: 'configure', component: ConfigurationsComponent },
            { path: 'manage', component: ConfigurationComponent },
            { path: '', redirectTo: 'manage', pathMatch: 'full' }
        ]
    }
]

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        ConfigurationsComponent, ConfigurationComponent
    ],
    providers: [],
    entryComponents: []

})
export class ConfigurationsModule {

}