import { Routes } from "@angular/router";

export const APP_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'event/:id',
    loadComponent: () =>
      import('./components/page-detail/page-detail.component').then((m) => m.PageDetailComponent),
  },
];
