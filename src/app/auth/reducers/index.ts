
import { routerReducer } from '@ngrx/router-store';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
  State
} from '@ngrx/store';
import { MetaReducer } from '@ngrx/store/src';
import { environment } from '../../../environments/environment';
import { AuthAction } from '../action-type';
import { User } from '../model/user.model';

export const authFeatureKey = 'auth';

export interface AuthState {
  user: User
}

export const inititialAuthState: AuthState = {
  user: undefined
};

export const authReducer = createReducer(
  inititialAuthState,

  on(AuthAction.login, (state, action) => {
    return {
      user: action.user
    }
  }),

  on(AuthAction.logout, (state, action) => {
    return {
      user: undefined
    }
  })

)
