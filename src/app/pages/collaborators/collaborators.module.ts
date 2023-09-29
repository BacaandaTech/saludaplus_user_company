import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollaboratorsRoutingModule } from './collaborators-routing.module';
import { CollaboratorsComponent } from './collaborators.component';
import { ListCollaboratorsComponent } from './list-collaborators/list-collaborators.component';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';


@NgModule({
  declarations: [
    CollaboratorsComponent,
    ListCollaboratorsComponent
  ],
  imports: [
    CommonModule,
    CollaboratorsRoutingModule,
    AgGridModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule.forRoot()
    
  ]
})
export class CollaboratorsModule { }
