import { Routes } from '@angular/router';
import { AppRoutes } from '../@shared/models/appRoutes';
import { ShellyHomeComponent } from './shelly-home/shelly-home.component';

export const PROJECTS_ROUTES: Routes = [
  {
    path: AppRoutes.HOME_AUTOMATION,
    component: ShellyHomeComponent,
  },
  {
    path: AppRoutes.MUSIC,
    loadChildren: () =>
      import('./music/music.routes').then((m) => m.MUSIC_ROUTES),
  },
  {
    path: AppRoutes.WHEELCHAIR,
    loadChildren: () =>
      import('./wheelchair/wheelchair.routes').then((m) => m.WHEELCHAIR_ROUTES),
  },
];
