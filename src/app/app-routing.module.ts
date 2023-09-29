import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { NotLoggedGuard } from './shared/guards/not_logged.guard';
import { LandingComponent } from './pages/landing/landing.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  
  {
    path: 'login',
    component:LoginComponent,
    canActivate:[NotLoggedGuard]
  },
  {
    path: 'main',
    component:LandingComponent,
    canActivate:[AuthGuard]
  },
  
  { path: 'collaborators', loadChildren: () => import('./pages/collaborators/collaborators.module').then(m => m.CollaboratorsModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
