import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {DialogService} from 'primeng/dynamicdialog';
import {Subject} from 'rxjs';
import {takeUntil, tap} from 'rxjs/operators';
import {AddNewUserComponent} from '../../components/add-new-user/add-new-user.component';
import {DeleteUserComponent} from '../../components/delete-user/delete-user.component';
import {User} from '../../services/models/users.interface';
import {UsersState} from '../../store';
import {
  getUsers,
  refreshDeleteUser,
  refreshUpdateUser,
} from '../../store/actions';
import {
  selectGetUsers,
  selectGetUsersLoading,
} from '../../store/selectors/user.selector';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, OnDestroy {
  private destroyed$ = new Subject<void>();
  public usersData: User[] = [];
  public usersDataLoading: boolean = false;
  public maxRowsNumber: number = 5;
  public totalRecords: number = 0;
  constructor(
    private store: Store<UsersState>,
    public dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(getUsers());
    this.store
      .select(selectGetUsers)
      .pipe(
        takeUntil(this.destroyed$),
        tap((data) => {
          this.usersData = data;
        })
      )
      .subscribe();
    this.store
      .select(selectGetUsersLoading)
      .pipe(
        takeUntil(this.destroyed$),
        tap((data) => {
          this.usersDataLoading = data;
        })
      )
      .subscribe();
  }

  editUser($event: User) {
    this.dialogService.open(AddNewUserComponent, {
      header: 'მომხმარებლის დამატება',
      width: '70%',
      data: $event,
    });
  }

  deleteUser($event: User) {
    this.dialogService.open(DeleteUserComponent, {
      header: 'მომხმარებლის წაშლა',
      width: '70%',
      data: $event,
    });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
