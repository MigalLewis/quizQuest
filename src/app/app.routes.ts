import { Routes } from '@angular/router';
import { AuthenticatedPage } from './pages/authenticated/authenticated.page';
import { HomePage } from './pages/authenticated/home/home.page';
import { AboutPage } from './pages/authenticated/about/about.page';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { ViewFolderPage } from './pages/authenticated/view-folder/view-folder.page';
import { ViewPhotoPage } from './pages/authenticated/view-photo/view-photo.page';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'authenticated/home',
    pathMatch: 'full'
  },{
    path:'register',
    component: RegisterComponent,
    pathMatch: 'full',
  },
   {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
   },
  {
    path: 'authenticated',
    component: AuthenticatedPage,
    children: [
      {
        path: 'home',
        component: HomePage
      },
      {
        path: 'about',
        component: AboutPage 
      },
      {
        path: 'view/folder/:id',
        component: ViewFolderPage
      },
      {
        path: 'view/folder/:id/:photoId',
        component: ViewPhotoPage
      }
    ]
  }

];
