import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { CoursesActions } from "../action-types";
import { Course, compareCourses } from "../model/course";

export interface CoursesState extends EntityState<Course> {
}

export const adapter = createEntityAdapter<Course>({
    //compare function how to order enteties corectly
    sortComparer: compareCourses
});

export const initialCoursesState = adapter.getInitialState();

export const coursesReducer = createReducer(
    initialCoursesState,

    on(CoursesActions.allCoursesLoaded,
        (state, action) => adapter.addMany(action.courses, state))
)

export const { selectAll } = adapter.getSelectors();