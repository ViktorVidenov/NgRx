import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { tap } from "rxjs/operators";
import { AuthAction } from "./action-type";
@Injectable()
export class AuthEffects {
    constructor(private actions$: Actions, private route: Router) { }

    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthAction.login),
            tap(action => localStorage.setItem('user', JSON.stringify(action.user)))
        ),

        /*
        effect by default will dispatch an action. Without dispatch set to false, the login$ effect will wait for the login action to be dispatched, 
        trigger a side effect using tap() and then, the output of the observable is still a login action (after tap()), 
        because we did not for example map the action to something else, or called the backend.
        */
        { dispatch: false })


    logout$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthAction.logout),
            tap(action => {

                localStorage.removeItem('user');
                this.route.navigateByUrl('/login')
            })
        ),
        { dispatch: false })
}