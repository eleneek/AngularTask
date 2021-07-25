import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {Subject} from 'rxjs';
import {takeUntil, tap} from 'rxjs/operators';
import {User} from '../../services/models/users.interface';
import {UsersState} from '../../store';
import {deleteUser, getUsers, refreshDeleteUser} from '../../store/actions';
import {selectDeleteUserLoaded} from '../../store/selectors/user.selector';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss'],
})
export class DeleteUserComponent implements OnInit, OnDestroy {
  user: User;
  destroyed$ = new Subject<void>();

  constructor(
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private store: Store<UsersState>
  ) {
    this.user = this.config.data;
  }

  ngOnInit(): void {
    this.store
      .select(selectDeleteUserLoaded)
      .pipe(
        takeUntil(this.destroyed$),
        tap((data) => {
          if (data) {
            this.store.dispatch(getUsers());
            this.ref.close();
            this.store.dispatch(refreshDeleteUser());
          }
        })
      )
      .subscribe();
  }

  close() {
    this.ref.close();
  }

  delete() {
    this.store.dispatch(deleteUser({user: this.config.data}));
  }
  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
