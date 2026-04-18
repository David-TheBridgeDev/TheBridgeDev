import { Routes } from '@angular/router';
import { PublicComponent } from './public/public.component';
import { ShellyHomeComponent } from './shelly-home/view/shelly-home.component';
import { AppRoutes } from '../@shared/models/appRoutes';

export const PUBLIC_ROUTES: Routes = [
  {
    path: '',
    component: PublicComponent,
  },
  {
    path: AppRoutes.HOME_AUTOMATION,
    component: ShellyHomeComponent,
  },
  {
    path: AppRoutes.MUSIC,
    loadChildren: () =>
      import('./music/music.routes').then((m) => m.MUSIC_ROUTES),
  },
];
