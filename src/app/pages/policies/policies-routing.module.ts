import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PoliciesComponent } from './policies.component';
import { PoliciesListComponent } from './policies-list/policies-list.component';

const routes: Routes = [
  { 
    path: '',
    component: PoliciesComponent
  },
  { 
    path: 'list',
    component: PoliciesListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PoliciesRoutingModule { }
