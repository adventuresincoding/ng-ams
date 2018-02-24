import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../../services/auth.guard';
import { SharedModule } from '../../../core/modules/shared.module';
import { LookupService } from '../../../services/lookup-service';
import { ReferencesComponent } from './references.component';
import { ExamReferenceComponent } from './exams/examReference.component';
import { ESchoolCommonDialogComponent } from './commonDialog/commonDialog.component';
import { SubjectReferenceComponent } from './subject/subjectReference.component';
import { SubjectDialogComponent } from './subject/subjectDialog.component';
import { HardwareLookupComponent } from './hardware/hardware-lookup.component'

const routes: Routes = [
    {
        path: 'references', component: ReferencesComponent,
        resolve: {

        },
        children: [
            { path: '', redirectTo: '', pathMatch: 'full' },
            { path: 'list', component: ReferencesComponent },
            { path: 'device', component: SubjectReferenceComponent },
            { path: 'exams', component: ExamReferenceComponent },
            { path: 'hardware', component: HardwareLookupComponent }
        ]
    },
]

@NgModule({
    imports: [SharedModule, RouterModule.forChild(routes)],
    providers: [LookupService],
    declarations: [ReferencesComponent, ExamReferenceComponent, ESchoolCommonDialogComponent,
        SubjectReferenceComponent, SubjectDialogComponent, HardwareLookupComponent],
    entryComponents: [ESchoolCommonDialogComponent, SubjectDialogComponent,]
})
export class ReferencesModule {
    /**
     *
     */
    constructor() {
    }
}
