import {Action, createReducer, on} from '@ngrx/store';
import {EntityState, EntityAdapter, createEntityAdapter} from '@ngrx/entity';
import {User} from '../../services/models/users.interface';
import {addUser, updateUser} from '../actions';

export const adapter: EntityAdapter<User> = createEntityAdapter<User>();

export interface State extends EntityState<User> {}

export const initialState: State = adapter.getInitialState({});

const userReducer = createReducer(
  initialState,
  on(addUser, (state, {user}) => ({
    ...adapter.addOne(user, state),
  })),
  on(updateUser, (state, {user}) => ({
    ...adapter.updateOne(
      {
        id: user.id,
        changes: user,
      },
      state
    ),
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return userReducer(state, action);
}

const {selectAll} = adapter.getSelectors();

export const selectAllUsers = selectAll;
