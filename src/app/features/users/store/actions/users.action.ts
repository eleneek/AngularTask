import {createAction, props} from '@ngrx/store';
import {User} from '../../services/models/users.interface';
import {UserActionTypes} from './users.action.types';

export const addUser = createAction(
  UserActionTypes.ADD_USER,
  props<{user: User}>()
);
export const updateUser = createAction(
  UserActionTypes.UPDATE_USER,
  props<{user: User}>()
);
