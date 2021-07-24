import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { checkNumberLength } from '../../services/helpers/number-validation';

@Component({
  selector: 'app-add-new-user',
  templateUrl: './add-new-user.component.html',
  styleUrls: ['./add-new-user.component.scss'],
})
export class AddNewUserComponent implements OnInit {
  userForm: FormGroup;
  constructor(private fb: FormBuilder, public ref: DynamicDialogRef) {
    this.userForm = this.fb.group({
      id: [null],
      name: [
        '',
        [
          Validators.minLength(2),
          Validators.maxLength(50),
          Validators.required,
        ],
      ],
      lastName: [
        '',
        [
          Validators.minLength(2),
          Validators.maxLength(50),
          Validators.required,
        ],
      ],
      sex: [''],
      identificationNumber: [
        null,
        [Validators.required, checkNumberLength(11)],
      ],
      mobileNumber: [null, [Validators.required, checkNumberLength(9)]],
      physicalAddress: this.fb.group({
        country: ['', [Validators.required]],
        city: ['', [Validators.required]],
        streetAdress: ['', [Validators.required]],
      }),
      image: [''],
    });
  }

  ngOnInit(): void {}

  close() {
    this.ref.close();
  }

  submit() {
    console.log(this.userForm);
  }
}
