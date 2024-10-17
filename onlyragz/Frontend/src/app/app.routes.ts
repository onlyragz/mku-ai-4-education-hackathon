import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { WelcomeComponent } from './components/pages/welcome/welcome.component';
import { authGuard } from './components/guards/auth.guard';
import { DashComponent } from './components/pages/dash/dash.component';

export const routes: Routes = [
    {'path': '', component: HomeComponent, title: 'Home | Ventlie'},
    {'path': 'welcome', component: WelcomeComponent, canActivate: [authGuard]},
    {'path': 'dash', component: DashComponent}
];
