import { Routes } from '@angular/router';
import { AuthenticatedPage } from './pages/authenticated/authenticated.page';
import { HomePage } from './pages/authenticated/home/home.page';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'authenticated/home',
    pathMatch: 'full'
  },
  {
    path: 'authenticated',
    component: AuthenticatedPage,
    children: [
      {
        path: 'home',
        component: HomePage
      }
    ]
  },
];
