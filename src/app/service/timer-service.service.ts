import { Injectable } from '@angular/core';
import { BehaviorSubject, interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private timer$ = new BehaviorSubject<number>(0);
  private intervalSubscription: any;

  constructor() {}

  startTimer(duration: number) {
    this.timer$.next(duration);
    this.intervalSubscription = interval(1000).subscribe(() => {
      const currentValue = this.timer$.value;
      if (currentValue > 0) {
        this.timer$.next(currentValue - 1);
      } else {
        this.stopTimer();
      }
    });
  }

  stopTimer() {
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
    }
  }

  getTimer() {
    return this.timer$.asObservable();
  }
}
