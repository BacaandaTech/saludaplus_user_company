import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from "ag-grid-community";


@Component({
    selector: 'app-collaborator-status',
    template: `
    <div *ngIf="!isPolicyAssigned">
        Asignar
    </div>
    <div *ngIf="isPolicyAssigned">
        {{params.data.user_request.brand_policy.policy.folio}}
    </div>
   `
})
export class CollaboratorStatusComponent implements ICellRendererAngularComp {
    public cellValue!: string;
    public isPolicyAssigned!: boolean;
    public params!: ICellRendererParams;

    constructor(
       
        private router: Router,
        
    ) { }

    // gets called once before the renderer is used
    agInit(params: ICellRendererParams): void {
        this.params = params;
        this.isPolicyAssigned = (params.data.user_request === null || params.data.user_request === undefined) ? false : true;
    }

    // gets called whenever the cell refreshes
    refresh(params: ICellRendererParams): boolean {
        return false;
    }
}