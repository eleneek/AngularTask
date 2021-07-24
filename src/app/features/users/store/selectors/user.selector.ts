import {createFeatureSelector, createSelector} from '@ngrx/store';
import {selectAllUsers} from '../reducers/users.reducer';
import {UsersState} from '../index';

export const selectUserState = createFeatureSelector<UsersState>('users');

export const getUsersReducer = createSelector(
  selectUserState,
  (s) => s.usersReducer
);

export const selectlUsers = createSelector(getUsersReducer, selectAllUsers);
