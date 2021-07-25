import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {Subject} from 'rxjs';
import {takeUntil, tap} from 'rxjs/operators';
import {checkNumberLength} from '../../services/helpers/number-validation';
import {UsersState} from '../../store';
import {
  addUser,
  getUsers,
  refreshAddUser,
  refreshUpdateUser,
  updateUser,
} from '../../store/actions';
import {
  selectAddUserLoaded,
  selectUpdateUserLoaded,
} from '../../store/selectors/user.selector';

@Component({
  selector: 'app-add-new-user',
  templateUrl: './add-new-user.component.html',
  styleUrls: ['./add-new-user.component.scss'],
})
export class AddNewUserComponent implements OnInit, OnDestroy {
  public userForm: FormGroup;
  public submitted: boolean = false;
  private destroyed$ = new Subject<void>();
  public editMode: boolean = false;
  public newImageUpload: boolean = false;

  constructor(
    private fb: FormBuilder,
    public ref: DynamicDialogRef,
    private store: Store<UsersState>,
    public config: DynamicDialogConfig
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
    if (this.config.data) {
      this.editMode = true;
      this.userForm.setValue(this.config.data);
    } else {
      this.editMode = false;
    }
    this.store
      .select(selectAddUserLoaded)
      .pipe(
        takeUntil(this.destroyed$),
        tap((data) => {
          if (data) {
            this.closeAndLoadData();
            this.store.dispatch(refreshAddUser());
          }
        })
      )
      .subscribe();
    this.store
      .select(selectUpdateUserLoaded)
      .pipe(
        takeUntil(this.destroyed$),
        tap((data) => {
          if (data) {
            this.closeAndLoadData();
            this.store.dispatch(refreshUpdateUser());
          }
        })
      )
      .subscribe();
  }

  public onRemove() {
    this.userForm.get('image')?.setValue('');
  }
  public onSelect(event: any) {
    for (let file of event.files) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const base64data = reader.result as string;
        this.userForm.get('image')?.setValue(base64data);
      };
    }
  }

  public close() {
    this.ref.close();
  }

  public submit() {
    this.submitted = true;
    if (this.userForm.invalid) return;

    if (this.editMode) {
      this.store.dispatch(updateUser({user: this.userForm.value}));
    } else {
      this.userForm.get('id')?.setValue(new Date().getUTCMilliseconds());
      this.store.dispatch(
        addUser({user: {...this.userForm.value, bonuses: []}})
      );
    }
  }

  closeAndLoadData() {
    this.ref.close();
    this.store.dispatch(getUsers());
  }

  changeImage() {
    this.newImageUpload = true;
    this.onRemove();
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
