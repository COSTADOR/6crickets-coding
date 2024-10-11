import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'countdown-page',
    loadComponent: () => import('./countdown-page/countdown-page.component').then(c => c.CountdownPageComponent)
  },
  {
    path: 'camera-problem-page',
    loadComponent: () => import('./camera-problem-page/camera-problem-page.component').then(c => c.CameraProblemPageComponent)
  },
  {
    path: '**',
    redirectTo: 'countdown-page'
  }
];
