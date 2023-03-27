import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Course} from '../model/course';
import {Observable} from 'rxjs';
import {Lesson} from '../model/lesson';
import {concatMap, delay, filter, first, map, shareReplay, tap, withLatestFrom} from 'rxjs/operators';
import {CoursesHttpService} from '../services/courses-http.service';


@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  public course$!: Observable<Course>;

  public lessons$!: Observable<Lesson[]>;

  public displayedColumns = ['seqNo', 'description', 'duration'];

  public nextPage = 0;

  constructor(
    private coursesService: CoursesHttpService,
    private route: ActivatedRoute) {

  }

  ngOnInit(): void {

    const courseUrl = this.route.snapshot.paramMap.get("courseUrl");

    this.course$ = this.coursesService.findCourseByUrl(courseUrl);

    this.lessons$ = this.course$.pipe(
      concatMap(course => this.coursesService.findLessons(course.id)),
      tap(console.log)
    );

  }


  loadLessonsPage(course: Course): void {

  }

}
