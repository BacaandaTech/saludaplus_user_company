import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { NotLoggedGuard } from './shared/guards/not_logged.guard';
import { LandingComponent } from './pages/landing/landing.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
  
 
  {path: '', redirectTo:'main',pathMatch:'full'},
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
  
  { 
    path: 'collaborators', 
    loadChildren: () => import('./pages/collaborators/collaborators.module').then(m => m.CollaboratorsModule),
    canActivate:[AuthGuard]
  },
  
  { 
    path: 'policies', 
    loadChildren: () => import('./pages/policies/policies.module').then(m => m.PoliciesModule),
    canActivate:[AuthGuard]
  },
  { 
    path: 'users', 
    loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule),
    canActivate:[AuthGuard]
  },
  {path: '**', component:NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
