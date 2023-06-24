import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { EventService } from "../../servises/event.service";
import { EventType } from "../../interface/event-type";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { Subject, takeUntil } from "rxjs";

interface BetOptions {
  [key: string]: string
}

const betOptions: BetOptions = {
  'home': 'на победу хозяев',
  'draw': 'на ничью',
  'away': 'на победу гостей',
};

@Component({
  selector: 'app-page-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './page-detail.component.html',
  styleUrls: ['./page-detail.component.scss']
})
export class PageDetailComponent implements OnInit, OnDestroy {
  item: EventType | undefined;
  betOptions = betOptions;

  private EventService = inject(EventService);
  private route = inject(Router)
  private activeRoute = inject(ActivatedRoute)
  private unsubscribe$ = new Subject<void>();

  betForm: FormGroup = new FormGroup({
    bet: new FormControl('')
  });

  ngOnInit() {
    this.activeRoute.paramMap.pipe(takeUntil(this.unsubscribe$)).subscribe(param => {
      let id = 0;
      if (param.get('id') !== null && param.get('id')) {
        id = +param.get('id')!;
      }
      this.item = this.EventService.data.find((e) => e.id === id);

      if (this.item) {
        this.betForm.get('bet')?.setValue(this.item.selectedBet);
        if (!!this.item.selectedBet) {
          this.betForm.get('bet')?.disable();
        }
      }
    })
  }

  onSubmit() {
    if (!this.betForm.get('bet')?.value) return
    this.EventService.updateItem(1, this.betForm.get('bet')?.value)
    this.betForm.get('bet')?.disable();
    this.route.navigate(['/'], {
      queryParams: {
        match: this.item?.teams.join(' vs '),
        bet: this.betForm.get('bet')?.value
      }
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

