import { Component, OnInit } from '@angular/core';
import { EMPTY, iif, interval, merge, observable, Observable, of, Subject } from 'rxjs';
import { filter, map, startWith, switchMap, switchMapTo, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {

  constructor() { }

  start = false;
  pause = true;
  resume = true;
  reset = true;
  curVal = 0;

  button$ = new Subject<string>();

  counter$ = merge(
    of(0),
    this.button$.pipe(
      switchMap((status) => {
        if (status === 'START') {
          return interval(1000).pipe(map(v => { this.curVal = v + 1; return this.curVal; } ));
        }
        if (status === 'PAUSE') {
          return EMPTY;
        }
        if (status === 'RESUME') {
          return interval(1000).pipe(map(v => { this.curVal = this.curVal + 1; return this.curVal; }));
        }
        return of(0);
      })
    )
  );

  ngOnInit(): void {
  }

  startCounter(): void {
    this.button$.next('START');
    this.pause = false;
    this.reset = false;
    this.start = true;
  }

  pauseCounter(): void {
    this.button$.next('PAUSE');
    this.resume = false;
    this.pause = true;
  }

  resumeCounter(): void {
    this.button$.next('RESUME');
    this.pause = false;
    this.resume = true;
  }

  resetCounter(): void {
    this.button$.next('RESET');
    this.pause = true;
    this.reset = true;
    this.resume = true;
    this.start = false;
  }

}
