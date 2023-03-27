import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { concatMap, map, tap } from "rxjs/operators";
import { CoursesActions } from "./action-types";
import { allCoursesLoaded } from "./course.action";
import { CoursesHttpService } from "./services/courses-http.service";

@Injectable()
export class CoursesEffects {

    constructor(private actions$: Actions, private coursesHttpService: CoursesHttpService) { }

    private loadCourses$ = createEffect(
        () =>
            this.actions$
                .pipe(
                    ofType(CoursesActions.loadAllCourses),
                    concatMap(() => this.coursesHttpService.findAllCourses()),
                    map(courses => allCoursesLoaded({ courses }))
                ))

}