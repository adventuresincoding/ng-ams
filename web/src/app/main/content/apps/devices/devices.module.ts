import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../core/modules/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../../../services/auth.guard';
import { DevicesComponent } from './devices.component';
import { DeviceComponent } from './device/device.component';
import { DeviceListComponent } from './device-list/device-list.component';
import { DeviceSearchComponent } from './device-search/device-search.component';
import { HardwareComponent } from './hardware/hardware.component';
import { HardwareManagerComponent,HardwareDetailsDialogComponent } from './hardware-manager/hardware-manager.component';
import { HardwareSearchComponent } from './hardware-manager/hardware-search/hardware-search.component';

const routes: Routes = [
    {
        path: 'devices', component: DevicesComponent, canActivate: [AuthGuard],
        resolve: {

        },
        children: [
            { path: 'list', component: DeviceListComponent },
            { path: 'search', component: DeviceSearchComponent },
            { path: 'add', component: DeviceComponent },
            { path: 'hardware', component: HardwareComponent },
            { path: 'hardware/search', component: HardwareManagerComponent },
            { path: '', redirectTo: 'devices' }
        ]
    }
]

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    providers: [
    ],
    declarations: [
        DevicesComponent, DeviceComponent, DeviceSearchComponent, DeviceListComponent, HardwareComponent, HardwareManagerComponent
        ,HardwareSearchComponent,HardwareDetailsDialogComponent
    ],
    entryComponents:[HardwareDetailsDialogComponent]
})
export class DevicesModule {

}
