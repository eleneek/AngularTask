import { environment } from './../../environments/environment.prod';
import {
  ActionReducerMap,
  MetaReducer,
  combineReducers,
  Action,
} from '@ngrx/store';
import { InjectionToken } from '@angular/core';
import { ReducerToken } from '../shared/enums/ReducerToken.enum';

export interface State {}

export const reducers = new InjectionToken<ActionReducerMap<State, Action>>(
  ReducerToken.ROOT_TOKEN,
  {
    factory: () => ({}),
  }
);

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
