import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollaboratorsRoutingModule } from './collaborators-routing.module';
import { CollaboratorsComponent } from './collaborators.component';
import { ListCollaboratorsComponent } from './list-collaborators/list-collaborators.component';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { CreateCollaboratorComponent } from './create-collaborator/create-collaborator.component';
import { CollaboratorStatusComponent } from './list-collaborators/ag-grid/collaborator-status.component';
import { CollaboratorActionsComponent } from './list-collaborators/ag-grid/collaborator-actions.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { EditCollaboratorComponent } from './edit-collaborator/edit-collaborator.component';


@NgModule({
  declarations: [
    CollaboratorsComponent,
    ListCollaboratorsComponent,
    CreateCollaboratorComponent,
    CollaboratorStatusComponent,
    CollaboratorActionsComponent,
    EditCollaboratorComponent
  ],
  imports: [
    CommonModule,
    CollaboratorsRoutingModule,
    AgGridModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule.forRoot(),
    BsDatepickerModule.forRoot(),
    SharedModule
    
  ]
})
export class CollaboratorsModule { }
