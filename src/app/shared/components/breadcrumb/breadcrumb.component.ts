import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { BUTTON_ACTIONS, IButtonDetails } from '../../interfaces/utils.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements AfterViewInit,OnDestroy{
  @Input() searchBar: boolean = false;
  @Input() links?:any;
  @Input() actionButton:boolean = false;
  @Input() buttonDetails?:IButtonDetails;
  
  @Output() emitSearchValue = new EventEmitter<string>();

  searchValue: string = '';
  searchDebounce = new Subject<string | any>();

  constructor(
    private router:Router
  ){}

  ngAfterViewInit() {
    this.searchDebounce.pipe(
      debounceTime(1500),
      distinctUntilChanged())
      .subscribe(value => {
        this.emitSearchValue.emit(value);
      });
  }

  ngOnDestroy(): void {
    this.searchDebounce.unsubscribe();
  }

  handleActionButton(){
    if(this.buttonDetails !== undefined){
      switch (this.buttonDetails.action) {
        case BUTTON_ACTIONS.REDIRECT:
          this.router.navigateByUrl(this.buttonDetails.url!);
          break;
      
        default:
          break;
      }
    }
  }
}
