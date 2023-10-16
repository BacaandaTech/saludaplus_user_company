import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { CreateUserComponent } from './create-user/create-user.component';

const routes: Routes = [
  { 
    path: '', 
    component: UsersComponent 
  },
  { 
    path: 'list', 
    component: ListUsersComponent 
  },
  { 
    path: 'create', 
    component: CreateUserComponent 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
