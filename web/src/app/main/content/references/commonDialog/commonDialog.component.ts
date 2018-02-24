import { Component, Inject, OnInit, ViewEncapsulation, } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CalendarEvent } from 'angular-calendar';
import { FormBuilder, FormGroup } from '@angular/forms';
import 'rxjs/Rx';
// import { Contact } from '../contact.model';
import { FuseUtils } from '../../../../core/fuseUtils';
import { Validators } from '@angular/forms';
import { Examination } from '../../../../shared/models/examination/examination.model';

@Component({
    selector: 'eschool-common-dialog',
    templateUrl: './commonDialog.component.html',
    styleUrls: ['./commonDialog.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ESchoolCommonDialogComponent implements OnInit {
    event: CalendarEvent;
    dialogTitle: string;
    contactForm: FormGroup;
    action: string;
    contact: Contact;
    exam: Examination = new Examination();

    constructor(
        public dialogRef: MatDialogRef<ESchoolCommonDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any,
        private formBuilder: FormBuilder
    ) {
        this.action = data.action;

        if (this.action === 'edit') {
            this.dialogTitle = 'Edit Contact';
            this.contact = data.contact;
        }
        else {
            this.dialogTitle = 'New Contact';
            this.contact = new Contact({});
        }

        this.contactForm = this.createContactForm();
    }

    ngOnInit() {
    }

    createContactForm() {
        return this.formBuilder.group({
            id: [this.contact.id],
            name: [this.contact.name],
            lastName: [this.contact.lastName],
            avatar: [this.contact.avatar],
            nickname: [this.contact.nickname],
            company: [this.contact.company],
            jobTitle: [this.contact.jobTitle],
            email: [this.contact.email],
            phone: [this.contact.phone],
            address: [this.contact.address],
            birthday: [this.contact.birthday],
            notes: [this.contact.notes],
            ExamName: ['', [Validators.nullValidator]],
            FromStandard: ['', [Validators.required]],
            ToStandard: ['', [Validators.required]],
            ExamDate: [null, [Validators.required]],
            ExamFee: ['', [Validators.required]],
        });
    }
}

export class Contact {
    id: string;
    name: string;
    lastName: string;
    avatar: string;
    nickname: string;
    company: string;
    jobTitle: string;
    email: string;
    phone: string;
    address: string;
    birthday: string;
    notes: string;

    constructor(contact) {
        {
            this.id = contact.id || FuseUtils.generateGUID();
            this.name = contact.name || '';
            this.lastName = contact.lastName || '';
            this.avatar = contact.avatar || 'assets/images/avatars/profile.jpg';
            this.nickname = contact.nickname || '';
            this.company = contact.company || '';
            this.jobTitle = contact.jobTitle || '';
            this.email = contact.email || '';
            this.phone = contact.phone || '';
            this.address = contact.address || '';
            this.birthday = contact.birhday || '';
            this.notes = contact.notes || '';
        }
    }
}
