import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {checkNumberLength} from '../../services/helpers/number-validation';
import {UsersService} from '../../services/users.service';
import {UsersState} from '../../store';
import {addUser} from '../../store/actions';
import {selectlUsers} from '../../store/selectors/user.selector';

@Component({
  selector: 'app-add-new-user',
  templateUrl: './add-new-user.component.html',
  styleUrls: ['./add-new-user.component.scss'],
})
export class AddNewUserComponent implements OnInit {
  userForm: FormGroup;
  submitted: boolean = false;
  constructor(
    private fb: FormBuilder,
    public ref: DynamicDialogRef,
    private userServ: UsersService,
    private store: Store<UsersState>
  ) {
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
      image: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    // this.store.select(selectlUsers).subscribe((data) => console.log(data));
  }

  onRemove(event: any) {
    this.userForm.get('image')?.setValue('');
  }
  onSelect(event: any) {
    for (let file of event.files) {
      this.userForm
        .get('image')
        ?.setValue(file.objectURL.changingThisBreaksApplicationSecurity);
    }
  }

  close() {
    this.ref.close();
  }

  submit() {
    this.submitted = true;
    if (this.userForm.invalid) {
      return;
    }

    this.userForm.get('id')?.setValue(new Date().getUTCMilliseconds());
    this.userServ.addUser(this.userForm.value).subscribe();
    this.store.dispatch(addUser({user: this.userForm.value}));
  }
}
