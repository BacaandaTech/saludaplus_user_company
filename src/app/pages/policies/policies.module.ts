import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PoliciesRoutingModule } from './policies-routing.module';
import { PoliciesComponent } from './policies.component';
import { PoliciesListComponent } from './policies-list/policies-list.component';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';


@NgModule({
  declarations: [
    PoliciesComponent,
    PoliciesListComponent
  ],
  imports: [
    CommonModule,
    PoliciesRoutingModule,
    AgGridModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule.forRoot()
  ]
})
export class PoliciesModule { }
