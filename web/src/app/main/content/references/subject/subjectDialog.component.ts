import { Component, Inject, OnInit, ViewEncapsulation, } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CalendarEvent } from 'angular-calendar';
import { FormBuilder, FormGroup } from '@angular/forms';
import 'rxjs/Rx';
import { FuseUtils } from '../../../../core/fuseUtils';
import { Validators } from '@angular/forms';
import { Subject } from '../../../../shared/models/common/subject.model';

@Component({
    selector: 'eschool-common-dialog',
    templateUrl: './subjectDialog.component.html',
    styleUrls: ['../references.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class SubjectDialogComponent implements OnInit {    
    subjectForm: FormGroup;
    action: string;  
    subject: Subject = new Subject();

    constructor(
        public dialogRef: MatDialogRef<SubjectDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any,
        private formBuilder: FormBuilder
    ) {
        this.action = data.action;

        this.subjectForm = this.createContactForm();
    }

    ngOnInit() {
    }

    createContactForm() {
        return this.formBuilder.group({
            // Name: ['', [Validators.required]],
            // Description: ['', [Validators.nullValidator]]
            Name:[this.subject.name],
            Description:[this.subject.description]
        });
    }
}

