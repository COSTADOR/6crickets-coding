import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-countdown-timer',
  standalone: true,
  templateUrl: './countdown-timer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './countdown-timer.component.scss'
})
export class CountdownTimerComponent implements OnInit {
  @Input() secondsLeft?: number;
  isDeadlineReached = false;

  constructor(private _cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.updateTimer();
  }

  updateTimer(): void {
    if (!this.secondsLeft) {
      return;
    }
    setTimeout(() => {
      this.secondsLeft!--;
      this.isDeadlineReached = this.secondsLeft === 0;
      this._cdr.detectChanges();
      this.updateTimer();
    }, 1000);
  }
}
