import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './@shared/components/page-not-found/page-not-found.component';
import { DummyReloadComponent } from './@shared/components/dummy-reload/dummy-reload.component';
import { AppRoutes } from './@shared/models/appRoutes';

export const routes: Routes = [
  {
    path: AppRoutes.HOME,
    loadChildren: () => import('./public').then((m) => m.PUBLIC_ROUTES),
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
  {
    path: 'reload',
    component: DummyReloadComponent,
  },
];
