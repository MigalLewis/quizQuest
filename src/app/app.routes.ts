import { Routes } from '@angular/router';
import { AuthenticatedPage } from './pages/authenticated/authenticated.page';
import { HomePage } from './pages/authenticated/home/home.page';
import { AboutPage } from './pages/authenticated/about/about.page';
import { HelpPage } from './pages/authenticated/help/help.page';
import { GuidedVideosPage } from './pages/authenticated/help/guided-videos/guided-videos.page';
import { HackedPage } from './pages/authenticated/help/hacked/hacked.page';
import { DataPrivacyPage } from './pages/authenticated/help/data-privacy/data-privacy.page';
import { ReportIssuePage } from './pages/authenticated/help/report-issue/report-issue.page';
import { RegisterComponent } from './pages/unauthenticated/register/register.component';
import { AuthGuard } from './guard/auth.guard';
import { UnauthenticatedGuard } from './guard/unauthenticated.guard';
import {ProfilePage} from './pages/authenticated/profile/profile.page';
import { PreGamePage } from './pages/authenticated/pre-game/pre-game.page';
import {TriviaPage } from './pages/authenticated/trivia/trivia.component';
import { CompletedGamePage } from './pages/authenticated/completed-game/completed-game.page';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'authenticated',
    component: AuthenticatedPage,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'home',
        component: HomePage
      },
      {
        path: 'trivia',
        component: TriviaPage
      },
      {
        path: 'about',
        component: AboutPage
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
      {
        path: 'profile',
        component: ProfilePage
      },
      {
        path: 'pre/game/:gameCode',
        component: PreGamePage
      },
      {
        path: 'completed/game',
        component: CompletedGamePage
      }
    ]
  },
  {
    path: 'landing',
    loadComponent: () => import('./pages/landing/landing.page').then( m => m.LandingPage)
  },
  {
    path: 'splash',
    loadComponent: () => import('./pages/splash/splash.page').then( m => m.SplashPage)
  },
  {
    path: 'sign/up',
    loadComponent: () => import('./pages/unauthenticated/sign-up/sign-up.page').then( m => m.SignUpPage)
  },
  {
    path:'register',
    loadComponent: () => import('./pages/unauthenticated/register/register.component').then(m => m.RegisterComponent),
    canActivate: [AuthGuard]
  },
   {
    path: 'login',
    loadComponent: () => import('./pages/unauthenticated/login/login.component').then(m => m.LoginComponent)
   }
];
