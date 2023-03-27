import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from '@angular/core'
import { AuthState } from "./reducers";
import { select, State, Store } from "@ngrx/store";
import { isLoggedIn } from "./auth.selectors";
import { tap } from "rxjs/operators";
import { AppState } from "../reducers";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private store: Store<AppState>, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

        return this.store
        .pipe(
            select(isLoggedIn),
            tap(loggedIn => {
                
                if (!loggedIn) {
                        console.log(loggedIn);
                        this.router.navigateByUrl('/login') 
                    }
                })
            )
    }
}