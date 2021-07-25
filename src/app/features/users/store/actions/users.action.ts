import {createAction, props} from '@ngrx/store';
import {User} from '../../services/models/users.interface';
import {UserActionTypes} from './users.action.types';

export const addUser = createAction(
  UserActionTypes.ADD_USER,
  props<{user: User}>()
);
export const addUserSuccess = createAction(
  UserActionTypes.ADD_USER_SUCCESS,
  props<{user: User}>()
);
export const addUserFail = createAction(UserActionTypes.ADD_USER_FAIL);
export const refreshAddUser = createAction(UserActionTypes.REFRESH_ADD_USER);

export const updateUser = createAction(
  UserActionTypes.UPDATE_USER,
  props<{user: User}>()
);
export const updateUserSuccess = createAction(
  UserActionTypes.UPDATE_USER_SUCCESS
);
export const updateUserFail = createAction(UserActionTypes.UPDATE_USER_FAIL);
export const refreshUpdateUser = createAction(
  UserActionTypes.REFRESH_UPDATE_USER
);

export const deleteUser = createAction(
  UserActionTypes.DELETE_USER,
  props<{user: User}>()
);
export const deleteUserSuccess = createAction(
  UserActionTypes.DELETE_USER_SUCCESS
);
export const deleteUserFail = createAction(UserActionTypes.DELETE_USER_FAIL);
export const refreshDeleteUser = createAction(
  UserActionTypes.REFRESH_DELETE_USER
);

export const getUsers = createAction(UserActionTypes.GET_USERS);
export const getUsersSuccess = createAction(
  UserActionTypes.GET_USERS_SUCCESS,
  props<{users: User[]}>()
);
export const getUsersFail = createAction(UserActionTypes.GET_USERS_FAIL);
