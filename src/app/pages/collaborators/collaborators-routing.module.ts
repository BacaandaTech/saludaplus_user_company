import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollaboratorsComponent } from './collaborators.component';
import { ListCollaboratorsComponent } from './list-collaborators/list-collaborators.component';

const routes: Routes = [
  { 
    path: '',
    component: CollaboratorsComponent 
  },
  { 
    path: 'list',
    component: ListCollaboratorsComponent 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollaboratorsRoutingModule { }
