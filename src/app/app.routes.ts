import { Routes } from '@angular/router';
import { AuthenticatedPage } from './pages/authenticated/authenticated.page';
import { HomePage } from './pages/authenticated/home/home.page';
import { AboutPage } from './pages/authenticated/about/about.page';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { ViewFolderPage } from './pages/authenticated/view-folder/view-folder.page';
import { ViewPhotoPage } from './pages/authenticated/view-photo/view-photo.page';
import { HelpPage } from './pages/authenticated/help/help.page';
import { GuidedVideosPage } from './pages/authenticated/help/guided-videos/guided-videos.page';
import { HackedPage } from './pages/authenticated/help/hacked/hacked.page';
import { DataPrivacyPage } from './pages/authenticated/help/data-privacy/data-privacy.page';
import { ReportIssuePage } from './pages/authenticated/help/report-issue/report-issue.page';

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
      },
      {
        path: 'help',
        component: HelpPage
      },
      {
        path: 'help/hacked',
        component: HackedPage
      },
      {
        path: 'help/data/privacy',
        component:DataPrivacyPage
      },
      {
        path: 'help/guided/videos',
        component: GuidedVideosPage
      },
      {
        path: 'help/report/issue',
        component:ReportIssuePage
      },
    ]
  },
 


];