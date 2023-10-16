import { Component, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, DomLayoutType, GridReadyEvent } from 'ag-grid-community';
import { Observable, Subject, Subscription, of, takeUntil } from 'rxjs';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { BUTTON_ACTIONS, IButtonDetails } from 'src/app/shared/interfaces/utils.interface';
import { usersService } from 'src/app/shared/services/users.service';
import { UserActionsComponent } from './ag-grid/user-actions.component';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent {
  public currentPage: number = 1;
  public totalUsers!: number;
  public usersPerPage: number = 10;

  private unsuscribe$: Subject<void> = new Subject();

  // Data that gets displayed in the grid
  public rowData$!: Observable<any[]>;
  public domLayout: DomLayoutType = 'autoHeight';

  public links:any =[
    {
      url:'/main',
      label:'Inicio'
    },
    {
      url:'/users/list',
      label:'Usuarios'
    },
  ];

  public buttonDetails: IButtonDetails = {
    action:BUTTON_ACTIONS.REDIRECT,
    label:'Agregar',
    url:'/users/create'
  }

  public columnDefs: ColDef[] = [
    {
      field: 'id',
      headerName: "ID",
      headerClass:'table-header'
    },
    {
      headerName: 'APELLIDOS',
      headerClass:'table-header',
      cellRenderer: (params:any) => {
        return params.data.meta.last_name +" "+ params.data.meta.second_last_name;
      }
    },
    {
      headerName: 'NOMBRE(S)',
      headerClass:'table-header',
      cellRenderer: (params:any) => {
        return params.data.meta.name;
      }
    },
    {
      headerName: 'ACCIONES',
      headerClass:'table-header',
      cellRenderer: UserActionsComponent
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

  public updateDataSubscription:Subscription;

  constructor(
    private userService:usersService
  ) { 
    this.updateDataSubscription = this.userService.currentStatusUpdateUsers
    .pipe(takeUntil(this.unsuscribe$))
    .subscribe({
      next: (response:any) =>{
        if(response == true){
          this.getUsers(this.searchValue);
        }
      }
    })
  }

  ngOnInit(): void {
    this.getUsers();
  }

  ngOnDestroy(): void {
    this.searchDebounce.unsubscribe();
    this.unsuscribe$.next();
    this.unsuscribe$.unsubscribe()
  }

  handleSearchValue(value:any){
    this.searchValue = value;
    this.getUsers(this.searchValue);
  }

  onGridReady(params: GridReadyEvent) {
    this.params = params;
  }

  getUsers(query?: string) {
    this.makingRequest = true;
    var searchTerm = undefined;
    if (query) {
      searchTerm = query;
    }
    this.userService.getUsers(this.currentPage, this.usersPerPage, query)
    .pipe(takeUntil(this.unsuscribe$))
    .subscribe({
      next: (response: any) => {
        this.rowData$ = of(response.data.users);
        this.currentPage = response.data.pagination.current_page;
        this.totalUsers = response.data.pagination.total;
        this.makingRequest = false;
        this.agGrid.gridOptions?.api?.sizeColumnsToFit();
      }
    })
  }

  loadPage(event: PageChangedEvent):void{
    this.currentPage = event.page;
    this.getUsers(this.searchValue);
  }
}
