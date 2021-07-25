import {createFeatureSelector, createSelector} from '@ngrx/store';
import {
  getSelectAddUserLoaded,
  getSelectAddUserLoading,
  getSelectDeleteUserLoaded,
  getSelectDeleteUserLoading,
  getSelectUpdateUserLoaded,
  getSelectUpdateUserLoading,
  getUsersData,
  getUsersDataLoaded,
  getUsersDataLoading,
  selectAllUsers,
} from '../reducers/users.reducer';
import {UsersState} from '../index';

export const selectUserState = createFeatureSelector<UsersState>('users');

export const getUsersReducer = createSelector(
  selectUserState,
  (s) => s.usersReducer
);

export const selectlUsers = createSelector(getUsersReducer, selectAllUsers);
export const selectAddUserLoaded = createSelector(
  getUsersReducer,
  getSelectAddUserLoaded
);
export const selectAddUserLoading = createSelector(
  getUsersReducer,
  getSelectAddUserLoading
);
export const selectUpdateUserLoaded = createSelector(
  getUsersReducer,
  getSelectUpdateUserLoaded
);
export const selectUpdateUserLoading = createSelector(
  getUsersReducer,
  getSelectUpdateUserLoading
);
export const selectDeleteUserLoaded = createSelector(
  getUsersReducer,
  getSelectDeleteUserLoaded
);
export const selectDeleteUserLoading = createSelector(
  getUsersReducer,
  getSelectDeleteUserLoading
);
export const selectGetUsers = createSelector(getUsersReducer, getUsersData);
export const selectGetUsersLoading = createSelector(
  getUsersReducer,
  getUsersDataLoading
);
export const selectGetUsersLoaded = createSelector(
  getUsersReducer,
  getUsersDataLoaded
);
