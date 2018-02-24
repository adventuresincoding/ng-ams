import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { fuseAnimations } from '../../../../core/animations';
import { CustomHttpService } from '.././../../../services/custom.service';
import { Subject } from '../../../../shared/models/common/subject.model';
import { SubjectDialogComponent } from './subjectDialog.component';

@Component({
  selector: 'subject-reference',
  templateUrl: './subjectReference.component.html',
  styleUrls: ['./subjectReference.component.scss'],
  animations: fuseAnimations
})
export class SubjectReferenceComponent implements OnInit {

  dialogRef: any;
  rows = [];
  editing = {};
  subject: Subject = new Subject();
  /**
   *Creates / edits a subject
   */
  constructor(private _dialog: MatDialog, private _http: CustomHttpService) {

  }

  ngOnInit() {
    this._http.getAll('Helper/GetSubjectList').map((response) => {
      return response.json();
    }).subscribe((result) => {
      this.rows = result;
    })
  }
  
  newSubject() {
    this.dialogRef = this._dialog.open(SubjectDialogComponent, {
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
        console.log(this.subject);
        let model = response.getRawValue();
        this.subject.description = model.description;
        this.subject.name = model.name;
        this._http.post('Helper/AddSubject', this.subject).subscribe((response) => {
          console.log(response);
        })
      });
  }

  updateValue(event, cell, cellValue, row) {
    this.editing[row.$$index + '-' + cell] = false;
    this.rows[row.$$index][cell] = event.target.value;
  }

}
