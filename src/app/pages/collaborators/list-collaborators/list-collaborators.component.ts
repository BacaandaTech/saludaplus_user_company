import { Component, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, DomLayoutType, GridReadyEvent } from 'ag-grid-community';
import { Observable, Subject, Subscription, debounceTime, distinctUntilChanged, of, takeUntil } from 'rxjs';
import { CollaboratorsService } from 'src/app/shared/services/collaborators.service';

@Component({
  selector: 'app-list-collaborators',
  templateUrl: './list-collaborators.component.html',
  styleUrls: ['./list-collaborators.component.scss']
})
export class ListCollaboratorsComponent {
  public currentPage: number = 1;
  public totalCollaborators!: number;
  public collaboratorsPerPage: number = 10;

  private unsuscribe$: Subject<void> = new Subject();

  // Data that gets displayed in the grid
  public rowData$!: Observable<any[]>;
  public domLayout: DomLayoutType = 'autoHeight';

  public columnDefs: ColDef[] = [
    {
      field: 'id',
      headerName: "ID",
      headerClass:'table-header'
    },
    {
      field: 'email',
      headerName: 'EMAIL',
      headerClass:'table-header'
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
    private collaboratorsService:CollaboratorsService
  ) { 
    this.updateDataSubscription = this.collaboratorsService.currentStatusUpdateComunicates
    .pipe(takeUntil(this.unsuscribe$))
    .subscribe({
      next: (response:any) =>{
        if(response == true){
          this.getCollaborators(this.searchValue);
        }
      }
    })
  }

  ngOnInit(): void {
    this.getCollaborators();
    
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
        this.getCollaborators(this.searchValue);
      });
  }

  onGridReady(params: GridReadyEvent) {
    this.params = params;
  }

  getCollaborators(query?: string) {
    this.makingRequest = true;
    var searchTerm = undefined;
    if (query) {
      searchTerm = query;
    }
    this.collaboratorsService.getCollaborators(this.currentPage, this.collaboratorsPerPage, query)
    .pipe(takeUntil(this.unsuscribe$))
    .subscribe({
      next: (response: any) => {
        this.rowData$ = of(response.data.collaborators);
        this.currentPage = response.data.pagination.current_page;
        this.totalCollaborators = response.data.pagination.total;
        this.makingRequest = false;
        this.agGrid.gridOptions?.api?.sizeColumnsToFit();
        console.log(response.data.collaborators)
      }
    })
  }

  loadPage():void{
    this.getCollaborators(this.searchValue);
  }
}
