import {Component, OnDestroy, OnInit} from '@angular/core';
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
  selectGetUsersLoaded,
  selectGetUsersLoading,
} from '../../store/selectors/user.selector';
import {ViewUsersDetailsComponent} from '../../components/view-users-details/view-users-details.component';
import {FiltersForm} from '../../services/models/filters.interface';
import {UsersService} from '../../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, OnDestroy {
  private destroyed$ = new Subject<void>();
  usersData: User[] = [];
  usersDataLoading: boolean = false;
  maxRowsNumber: number = 5;
  totalRecords: number = 0;
  first: number = 0;

  constructor(
    private store: Store<UsersState>,
    public dialogService: DialogService,
    private usersServ: UsersService
  ) {}

  ngOnInit(): void {
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
      .select(selectGetUsersLoaded)
      .pipe(
        takeUntil(this.destroyed$),
        tap((data) => {
          if (data) {
            if (this.totalRecords < this.first) {
              this.first = 0;
              this.changeFirstValue(0);
            } else {
              if (sessionStorage.getItem('currentPage')) {
                this.first = parseInt(
                  sessionStorage.getItem('currentPage') || ''
                );
              }
            }
          }
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

  applyFilters($event: FiltersForm) {
    sessionStorage.setItem('filters', JSON.stringify($event));
    this.usersServ.filtersForm = $event;
    this.store.dispatch(getUsers());
  }
  changeFirstValue($event: number) {
    sessionStorage.setItem('currentPage', $event.toString());
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

  changeMaxRowNumber($event: number) {
    this.maxRowsNumber = $event;
    this.store.dispatch(getUsers());
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
