import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {Subject} from 'rxjs';
import {takeUntil, tap} from 'rxjs/operators';
import {Bonus, User} from '../../services/models/users.interface';
import {UsersState} from '../../store';
import {getUsers, refreshUpdateUser, updateUser} from '../../store/actions';
import {selectUpdateUserLoaded} from '../../store/selectors/user.selector';

@Component({
  selector: 'app-view-and-delete-bonuses',
  templateUrl: './view-and-delete-bonuses.component.html',
  styleUrls: ['./view-and-delete-bonuses.component.scss'],
})
export class ViewAndDeleteBonusesComponent implements OnInit, OnDestroy {
  bonusesData: Bonus[] = [];
  maxRowsNumber: number = 3;
  totalRecords: number = 0;
  private destroyed$ = new Subject<void>();

  constructor(
    private ref: DynamicDialogRef,
    private store: Store<UsersState>,
    public config: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    this.bonusesData = this.config.data.bonuses;
    this.totalRecords = this.bonusesData.length;
    this.store
      .select(selectUpdateUserLoaded)
      .pipe(
        takeUntil(this.destroyed$),
        tap((data) => {
          if (data) {
            this.store.dispatch(refreshUpdateUser());
            this.store.dispatch(getUsers());
            this.ref.close();
          }
        })
      )
      .subscribe();
  }
  public deleteBonus($event: Bonus[]) {
    let user: User = {...this.config.data};
    $event.forEach((el) => {
      user.bonuses = user.bonuses.filter(
        (bonus) => bonus.bonusId !== el.bonusId
      );
    });

    this.bonusesData = [...user.bonuses];
    this.store.dispatch(updateUser({user}));
  }
  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
