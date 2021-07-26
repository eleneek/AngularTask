import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import {Subject} from 'rxjs';
import {takeUntil, tap} from 'rxjs/operators';
import {MessageToastService} from 'src/app/shared/services/message-toast.service';
import {CanComponentDeactivate} from '../../guards/prevent-back-button.guard';
import {checkNumberLength} from '../../services/helpers/number-validation';
import {User} from '../../services/models/users.interface';
import {UsersService} from '../../services/users.service';
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
  selectGetUsers,
  selectUpdateUserLoaded,
} from '../../store/selectors/user.selector';

@Component({
  selector: 'app-add-new-user',
  templateUrl: './add-new-user.component.html',
  styleUrls: ['./add-new-user.component.scss'],
})
export class AddNewUserComponent
  implements OnInit, OnDestroy, CanComponentDeactivate
{
  @ViewChild('fileUploader', {static: false})
  fileUploadControl: any;

  public userForm: FormGroup;
  public submitted: boolean = false;
  private destroyed$ = new Subject<void>();
  public editMode: boolean = false;
  public newImageUpload: boolean = false;
  private addedUsers: User[] = [];

  constructor(
    private fb: FormBuilder,
    public ref: DynamicDialogRef,
    private store: Store<UsersState>,
    public config: DynamicDialogConfig,
    private userServ: UsersService,
    private messageServ: MessageToastService,
    public dialogService: DialogService
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
      sex: ['', [Validators.required]],
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
      bonuses: [null],
    });
  }

  ngOnInit(): void {
    this.userServ.addAndEditModalOpened = true;
    if (this.config.data) {
      this.editMode = true;
      this.userForm.setValue(this.config.data);
    } else {
      this.editMode = false;
      this.store.dispatch(getUsers());
    }

    this.store
      .select(selectAddUserLoaded)
      .pipe(
        takeUntil(this.destroyed$),
        tap((data) => {
          if (data) {
            this.closeAndLoadData();
            this.store.dispatch(refreshAddUser());
            this.userForm.reset();
            this.fileUploadControl.clear();
            this.submitted = false;
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
    this.store
      .select(selectGetUsers)
      .pipe(
        takeUntil(this.destroyed$),
        tap((data) => {
          if (data) {
            this.addedUsers = data;
          }
        })
      )
      .subscribe();
  }

  canDeactivate() {
    if (this.userForm.valid && !this.editMode) {
      return window.confirm('დარწმუნებული ხართ რომ გსურთ გასვლა ?');
    } else {
      return true;
    }
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
    this.userServ.addAndEditModalOpened = false;
    this.ref.close();
  }

  public submit() {
    this.submitted = true;
    let userAdded = false;
    if (this.userForm.invalid) return;

    if (!this.editMode) {
      this.addedUsers.forEach((user) => {
        if (
          user.identificationNumber ===
          this.userForm.get('identificationNumber')?.value
        ) {
          userAdded = true;
        }
      });

      if (userAdded) {
        this.messageServ.addToast(
          'error',
          'მომხმარებლის დამატება',
          'მომხმარებელი მოცემული პირადი ნომრით უკვე დარეგისტრირებულია'
        );
        return;
      }
    }

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
    this.userServ.addAndEditModalOpened = false;
  }

  changeImage() {
    this.newImageUpload = true;
    // this.onRemove();
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
