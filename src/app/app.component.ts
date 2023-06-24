import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from "@angular/router";
import { NotificationComponent } from "./components/notification/notification.component";
import { NgIf } from "@angular/common";
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterOutlet,
    NotificationComponent,
    NgIf
  ],

})
export class AppComponent implements OnInit, OnDestroy {
  cd = inject(ChangeDetectorRef)
  bet = ''
  match = ''

  private route = inject(Router)
  private activeRoute = inject(ActivatedRoute)
  private unsubscribe$ = new Subject<void>();

  ngOnInit() {
    this.activeRoute.queryParams.pipe(takeUntil(this.unsubscribe$)).subscribe((params) => {
      if (params['bet'] && params['match']) {
        this.bet = params['bet'];
        this.match = params['match'];
      }
      setTimeout(() => {
        this.route.navigate([], {
          queryParams: {
            'bet': null,
            'match': null
          },
          queryParamsHandling: 'merge'
        });
        this.bet = '';
        this.match = '';
        this.cd.detectChanges();
      }, 5000);
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
