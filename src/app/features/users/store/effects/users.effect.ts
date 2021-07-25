import {Injectable} from '@angular/core';

import {createEffect, Actions, ofType} from '@ngrx/effects';

import {catchError, exhaustMap, mergeMap} from 'rxjs/operators';
import {of} from 'rxjs';

import * as usersActions from '../actions/users.action';

import {UsersService} from '../../services/users.service';
import {MessageService} from 'primeng/api';
import {MessageToastService} from 'src/app/shared/services/message-toast.service';
import {LoaderService} from 'src/app/shared/services/loader.service';

@Injectable()
export class UsersEffects {
  addUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usersActions.addUser),
      exhaustMap(({user}) =>
        this.usersService.addUser(user).pipe(
          mergeMap((data) => {
            if (data) {
              this.messageToast.addToast(
                'success',
                'მომხმარებლის დამატება',
                'მომხმარებელი წარმატებით დაემატა'
              );

              return [
                usersActions.addUserSuccess({
                  user: data,
                }),
              ];
            } else {
              return [usersActions.addUserFail];
            }
          }),
          catchError(() => {
            this.messageToast.addToast(
              'error',
              'მომხმარებლის დამატება',
              'მომხმარებელი ვერ დაემატა. გთხოვთ, სცადოთ ხელახლა'
            );
            return of(usersActions.addUserFail());
          })
        )
      )
    )
  );
  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usersActions.updateUser),
      exhaustMap(({user}) =>
        this.usersService.updateUser(user).pipe(
          mergeMap((data) => {
            if (data) {
              this.messageToast.addToast(
                'success',
                'მომხმარებლის ქმედება',
                'ქმედება წარმატებით განხორციელდა'
              );

              return [usersActions.updateUserSuccess()];
            } else {
              return [usersActions.updateUserFail];
            }
          }),
          catchError(() => {
            this.messageToast.addToast(
              'error',
              'მომხმარებლის ქმედება',
              'ქმედება ვერ განხორციელდა. გთხოვთ, სცადოთ ხელახლა'
            );
            return of(usersActions.updateUserFail());
          })
        )
      )
    )
  );
  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usersActions.deleteUser),
      exhaustMap(({user}) =>
        this.usersService.deleteUser(user).pipe(
          mergeMap((data) => {
            if (data) {
              this.messageToast.addToast(
                'success',
                'მომხმარებლის წაშლა',
                'მომხმარებელი წარმატებით წაიშალა'
              );

              return [usersActions.deleteUserSuccess()];
            } else {
              return [usersActions.deleteUserFail];
            }
          }),
          catchError(() => {
            this.messageToast.addToast(
              'error',
              'მომხმარებლის წაშლა',
              'მომხმარებელი ვერ წაიშალა. გთხოვთ, სცადოთ ხელახლა'
            );
            return of(usersActions.deleteUserFail());
          })
        )
      )
    )
  );
  getUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usersActions.getUsers),
      exhaustMap(() =>
        this.usersService.getUsers().pipe(
          mergeMap((data) => {
            if (data) {
              return [
                usersActions.getUsersSuccess({
                  users: data,
                }),
              ];
            } else {
              return [usersActions.getUsersFail];
            }
          }),
          catchError(() => {
            this.messageToast.addToast(
              'error',
              'მომხმარებლების სია',
              'მომხმარებლების წამოღება ვერ მოხერხდა. გთხოვთ, სცადოთ მოგვიანებით '
            );
            return of(usersActions.getUsersFail());
          })
        )
      )
    )
  );
  constructor(
    private actions$: Actions,
    private usersService: UsersService,
    private messageToast: MessageToastService
  ) {}
}
