import {Action, createReducer, on} from '@ngrx/store';
import {EntityState, EntityAdapter, createEntityAdapter} from '@ngrx/entity';
import {User} from '../../services/models/users.interface';
import {
  addUser,
  addUserFail,
  addUserSuccess,
  deleteUser,
  deleteUserFail,
  deleteUserSuccess,
  getUsers,
  getUsersFail,
  getUsersSuccess,
  refreshAddUser,
  refreshDeleteUser,
  refreshUpdateUser,
  updateUser,
  updateUserFail,
  updateUserSuccess,
} from '../actions';

export const adapter: EntityAdapter<User> = createEntityAdapter<User>();

export interface State extends EntityState<User> {
  addUserLoading: boolean;
  addUserLoaded: boolean;
  updateUserLoading: boolean;
  updateUserLoaded: boolean;
  deleteUserLoading: boolean;
  deleteUserLoaded: boolean;
  usersData: User[];
  usersDataLoaded: boolean;
  usersDataLoading: boolean;
}

export const initialState: State = adapter.getInitialState({
  addUserLoaded: false,
  addUserLoading: false,
  updateUserLoading: false,
  updateUserLoaded: false,
  deleteUserLoading: false,
  deleteUserLoaded: false,
  usersData: [],
  usersDataLoaded: false,
  usersDataLoading: false,
});

const userReducer = createReducer(
  initialState,
  on(addUser, (state, {user}) => ({
    ...adapter.addOne(user, state),
    ...state,
    addUserLoaded: false,
    addUserLoading: true,
  })),
  on(addUserSuccess, (state) => ({
    ...state,
    addUserLoaded: true,
    addUserLoading: false,
  })),
  on(addUserFail, (state) => ({
    ...state,
    addUserLoaded: false,
    addUserLoading: false,
  })),
  on(refreshAddUser, (state) => ({
    ...state,
    addUserLoaded: false,
    addUserLoading: false,
  })),
  on(updateUser, (state, {user}) => ({
    ...adapter.updateOne(
      {
        id: user.id,
        changes: user,
      },
      state
    ),
    ...state,
    updateUserLoading: true,
    updateUserLoaded: false,
  })),
  on(updateUserSuccess, (state) => ({
    ...state,
    updateUserLoading: false,
    updateUserLoaded: true,
  })),
  on(updateUserFail, (state) => ({
    ...state,
    updateUserLoading: false,
    updateUserLoaded: false,
  })),
  on(refreshUpdateUser, (state) => ({
    ...state,
    updateUserLoading: false,
    updateUserLoaded: false,
  })),
  on(getUsers, (state) => ({
    ...state,
    usersData: [],
    usersDataLoaded: false,
    usersDataLoading: true,
  })),
  on(getUsersSuccess, (state, {users}) => ({
    ...state,
    usersData: users,
    usersDataLoaded: true,
    usersDataLoading: false,
  })),
  on(getUsersFail, (state) => ({
    ...state,
    usersData: [],
    usersDataLoaded: false,
    usersDataLoading: false,
  })),
  on(deleteUser, (state, {user}) => ({
    ...adapter.removeOne(user.id, state),
    ...state,
    deleteUserLoaded: false,
    deleteUserLoading: true,
  })),
  on(deleteUserSuccess, (state) => ({
    ...state,
    deleteUserLoaded: true,
    deleteUserLoading: false,
  })),
  on(deleteUserFail, (state) => ({
    ...state,
    deleteUserLoaded: false,
    deleteUserLoading: false,
  })),
  on(refreshDeleteUser, (state) => ({
    ...state,
    deleteUserLoaded: false,
    deleteUserLoading: false,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return userReducer(state, action);
}

const {selectAll} = adapter.getSelectors();

export const selectAllUsers = selectAll;
export const getSelectAddUserLoaded = (state: State) => state.addUserLoaded;
export const getSelectAddUserLoading = (state: State) => state.addUserLoading;
export const getSelectUpdateUserLoaded = (state: State) =>
  state.updateUserLoaded;
export const getSelectUpdateUserLoading = (state: State) =>
  state.updateUserLoading;
export const getSelectDeleteUserLoaded = (state: State) =>
  state.deleteUserLoaded;
export const getSelectDeleteUserLoading = (state: State) =>
  state.deleteUserLoading;
export const getUsersData = (state: State) => state.usersData;
export const getUsersDataLoaded = (state: State) => state.usersDataLoaded;
export const getUsersDataLoading = (state: State) => state.usersDataLoading;
