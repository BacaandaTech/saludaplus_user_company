import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollaboratorsComponent } from './collaborators.component';
import { ListCollaboratorsComponent } from './list-collaborators/list-collaborators.component';
import { CreateCollaboratorComponent } from './create-collaborator/create-collaborator.component';
import { EditCollaboratorComponent } from './edit-collaborator/edit-collaborator.component';

const routes: Routes = [
  { 
    path: '',
    component: CollaboratorsComponent 
  },
  { 
    path: 'list',
    component: ListCollaboratorsComponent 
  },
  { 
    path: 'create',
    component: CreateCollaboratorComponent 
  },
  { 
    path: 'edit/:id_collab',
    component: EditCollaboratorComponent 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollaboratorsRoutingModule { }
