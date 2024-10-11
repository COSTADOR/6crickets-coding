import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {CountdownTimerComponent} from './countdown-timer/countdown-timer.component';
import {CountdownPageService} from './countdown-page.service';
import {NgIf} from '@angular/common';
import {Subject, takeUntil} from 'rxjs';

@Component({
  selector: 'app-countdown-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CountdownTimerComponent,
    NgIf
  ],
  providers: [CountdownPageService],
  templateUrl: './countdown-page.component.html',
  styleUrl: './countdown-page.component.scss'
})
export class CountdownPageComponent implements OnInit, OnDestroy {
  public initialSecondsLeft?: number;

  private _destroy$ = new Subject<void>();

  constructor(private countdownPageService: CountdownPageService) {}

  ngOnInit(): void {
    this.countdownPageService.getDeadlineSeconds()
      .pipe(takeUntil(this._destroy$))
      .subscribe(initialSecondsLeft => {
        this.initialSecondsLeft = initialSecondsLeft;
      });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
