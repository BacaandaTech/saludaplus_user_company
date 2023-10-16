import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, DomLayoutType, GridReadyEvent } from 'ag-grid-community';
import { Observable, Subject, Subscription, debounceTime, distinctUntilChanged, of, takeUntil } from 'rxjs';
import { PoliciesService } from 'src/app/shared/services/policies.service';

@Component({
  selector: 'app-policies-list',
  templateUrl: './policies-list.component.html',
  styleUrls: ['./policies-list.component.scss']
})
export class PoliciesListComponent implements OnInit{
  public currentPage: number = 1;
  public totalPolicies!: number;
  public policiesPerPage: number = 10;

  private unsuscribe$: Subject<void> = new Subject();

  // Data that gets displayed in the grid
  public rowData$!: Observable<any[]>;
  public domLayout: DomLayoutType = 'autoHeight';

  public columnDefs: ColDef[] = [
    {
      field: 'created_at',
      headerName: "FECHA",
      headerClass:'table-header'
    },
    {
      headerName: 'POLIZAS',
      headerClass:'table-header',
      cellRenderer: (params:any) => {
        return params.data.policy.folio;
      }
    },
    {
      headerName: 'VIGENCIA',
      headerClass:'table-header',
      cellRenderer: (params:any) => {
        return params.data.policy.validity;
      }
    },
    {
      headerName: 'ESTATUS',
      headerClass:'table-header',
      cellRenderer: (params:any) => {
        return `
          <div class="status ${params.data.status}">${params.data.status == 'available' ? 'NO ASIGNADO' : 'ASIGNADO'}</div>
        `;
      }
    },

    {
      headerName: 'ACCIONES',
      headerClass:'table-header',
      
    },
    
  ];

  public params: any;

  // DefaultColDef sets props common to all Columns
  public defaultColDef: ColDef = {
    sortable: true,
    filter: false,
  };

  // For accessing the Grid's API
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  //Variables for debounce search
  searchValue: string = '';
  searchDebounce = new Subject<string | any>();

  public makingRequest:boolean = false;

  private updateDataSubscription:Subscription;

  constructor(
    private policiesServices:PoliciesService
  ) { 
    this.updateDataSubscription = this.policiesServices.currentStatusUpdatePolicies
    .pipe(takeUntil(this.unsuscribe$))
    .subscribe({
      next: (response:any) =>{
        if(response == true){
          this.getPolicies(this.searchValue);
        }
      }
    })
  }

  ngOnInit(): void {
    this.getPolicies();
    
  }

  ngOnDestroy(): void {
    this.searchDebounce.unsubscribe();
    this.unsuscribe$.next();
    this.unsuscribe$.unsubscribe()
  }

  ngAfterViewInit() {
    this.searchDebounce.pipe(
      debounceTime(1500),
      distinctUntilChanged())
      .subscribe(value => {
        this.searchValue = value;
        this.getPolicies(this.searchValue);
      });
  }

  onGridReady(params: GridReadyEvent) {
    this.params = params;
  }

  getPolicies(query?: string) {
    this.makingRequest = true;
    var searchTerm = undefined;
    if (query) {
      searchTerm = query;
    }
    this.policiesServices.getPolicies(this.currentPage, this.policiesPerPage, query)
    .pipe(takeUntil(this.unsuscribe$))
    .subscribe({
      next: (response: any) => {
        this.rowData$ = of(response.data.policies);
        this.currentPage = response.data.policies.length / this.policiesPerPage;
        this.totalPolicies = response.data.policies.length;
        this.makingRequest = false;
        this.agGrid.gridOptions?.api?.sizeColumnsToFit();
      }
    })
  }

  loadPage():void{
    this.getPolicies(this.searchValue);
  }
}
