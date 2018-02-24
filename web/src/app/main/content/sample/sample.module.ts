import { NgModule } from '@angular/core';
import { RouterModule,Routes, Router, ActivatedRoute } from '@angular/router';

import { SharedModule } from '../../../core/modules/shared.module';

import { FuseSampleComponent } from './sample.component';
import { AuthGuard } from '../../../services/auth.guard';

const routes : Routes = [
    {
        path     : 'sample',
        component: FuseSampleComponent,
        canActivate:[AuthGuard]
    }
];

@NgModule({
    declarations: [
        FuseSampleComponent
    ],
    imports     : [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    exports     : [
        FuseSampleComponent
    ]
})

export class FuseSampleModule
{
}
