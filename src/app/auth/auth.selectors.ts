import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./reducers";

//feature selector to select all feature state 
export const selectAuthState = createFeatureSelector<AuthState>("auth");

export const isLoggedIn = createSelector(
    selectAuthState,
    (auth) => !!auth.user
);

export const isLoggedOut = createSelector(
    isLoggedIn,
    loggedIn => !loggedIn
)