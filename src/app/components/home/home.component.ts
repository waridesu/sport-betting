import { Component, inject } from '@angular/core';
import { NgForOf } from "@angular/common";
import { RouterLink } from "@angular/router";
import { EventService } from "../../servises/event.service";

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  imports: [
    NgForOf,
    RouterLink
  ],
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
events: any[] = inject(EventService).data
}
