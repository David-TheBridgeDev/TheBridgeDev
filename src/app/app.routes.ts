import { Routes } from '@angular/router';
import { AppRoutes } from './@shared/models/appRoutes';
import { PageNotFoundComponent } from './@shared/components/page-not-found/page-not-found.component';
import { DummyReloadComponent } from './@shared/components/dummy-reload/dummy-reload.component';

export const routes: Routes = [
  {
    path: AppRoutes.HOME,
    loadChildren: () =>
      import('./public/public.routes').then((m) => m.PUBLIC_ROUTES),
  },
  {
    path: AppRoutes.PROJECTS,
    loadChildren: () =>
      import('./projects/projects.routes').then((m) => m.PROJECTS_ROUTES),
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
