import { ActionReducerMap } from '@ngrx/store';
import { reducer } from './reducers/users.reducer';

export interface UsersState {
  usersReducer: any;
}

export const usersReducer: ActionReducerMap<UsersState> = {
  usersReducer: reducer,
};
