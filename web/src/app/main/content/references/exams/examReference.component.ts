import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ESchoolCommonDialogComponent } from '../commonDialog/commonDialog.component';
import { FormGroup } from '@angular/forms';
import { fuseAnimations } from '../../../../core/animations';
import { Examination } from '../../../../shared/models/examination/examination.model';
import { CustomHttpService } from '.././../../../services/custom.service';

@Component({
    selector: 'exams-reference',
    templateUrl: './examReference.component.html',
    styleUrls: ['./examReference.component.scss'],
    animations: fuseAnimations
})
export class ExamReferenceComponent implements OnInit {

    dialogRef: any;
    private exam: Examination = new Examination();
    rows = [];
    editing= {};
    /**
     *
     */
    constructor(private _dialog: MatDialog, private _http: CustomHttpService) {
    }

    ngOnInit() {      
        this._http.getAll('Examination/GetExamList').map((response) => {
            return response.json();
        }).subscribe((response) => {
            this.rows = response;
            console.log(this.rows);
        })
        console.log(this.rows);
    }

    newContact() {
        this.dialogRef = this._dialog.open(ESchoolCommonDialogComponent, {
            panelClass: 'contact-form-dialog',
            data: {
                action: 'new'
            }
        });

        this.dialogRef.afterClosed()
            .subscribe((response: FormGroup) => {
                if (!response) {
                    return;
                } debugger;
                console.log(this.exam);
                let model = response.getRawValue();
                this.exam.description = model.description;
                this.exam.examDate = model.examDate;
                this.exam.examName = model.examName;
                this.exam.examType = model.examType;
                this.exam.fromStandard = model.fromStandard;
                this.exam.toStandard = model.toStandard;
                this.exam.year = model.year;
                this.exam.examFee = model.examFee;
                console.log('hey there' + response.getRawValue());

                //this.contactsService.updateContact(response.getRawValue());
                this._http.post('Examination/AddExam', this.exam).subscribe((response) => {
                    console.log(response);
                })
            });
    }

    updateValue(event, cell, cellValue, row) {       
        this.editing[row.$$index + '-' + cell] = false;
        this.rows[row.$$index][cell] = event.target.value;     
    }

}
