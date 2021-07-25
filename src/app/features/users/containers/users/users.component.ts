import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import {Subject} from 'rxjs';
import {takeUntil, tap} from 'rxjs/operators';
import {AddBonusComponent} from '../../components/add-bonus/add-bonus.component';
import {AddNewUserComponent} from '../../components/add-new-user/add-new-user.component';
import {DeleteUserComponent} from '../../components/delete-user/delete-user.component';
import {ViewAndDeleteBonusesComponent} from '../view-and-delete-bonuses/view-and-delete-bonuses.component';
import {User} from '../../services/models/users.interface';
import {UsersState} from '../../store';
import {getUsers} from '../../store/actions';
import {
  selectGetUsers,
  selectGetUsersLoading,
} from '../../store/selectors/user.selector';
import {ViewUsersDetailsComponent} from '../../components/view-users-details/view-users-details.component';
import {CanComponentDeactivate} from '../../guards/prevent-back-button.guard';
import {Router} from '@angular/router';
import {PlatformLocation} from '@angular/common';

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
  public first: number = 0;

  constructor(
    private store: Store<UsersState>,
    public dialogService: DialogService,
    private router: Router,
    private ref: DynamicDialogRef
  ) {}

  ngOnInit(): void {
    this.store.dispatch(getUsers());
    this.store
      .select(selectGetUsers)
      .pipe(
        takeUntil(this.destroyed$),
        tap((data) => {
          this.usersData = data;
          this.totalRecords = data.length;
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
      header: 'მომხმარებლის რედაქტირება',
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

  addBonus($event: User) {
    this.dialogService.open(AddBonusComponent, {
      header: 'ბონუსის დამატება',
      width: '70%',
      data: $event,
    });
  }
  viewAndDeleteBonus($event: User) {
    this.dialogService.open(ViewAndDeleteBonusesComponent, {
      header: 'ბონუსის ნახვა/წაშლა',
      width: '70%',
      data: $event,
    });
  }
  viewDetails($event: User) {
    this.dialogService.open(ViewUsersDetailsComponent, {
      header: 'მომხმარებლის დეტალური ნახვა',
      width: '70%',
      data: $event,
    });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
