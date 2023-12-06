import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PoliciesService {
  private statusUpdatePolicies: BehaviorSubject<any> = new BehaviorSubject(undefined);
  public readonly currentStatusUpdatePolicies: Observable<any> = this.statusUpdatePolicies.asObservable();

  constructor(
    private http: HttpClientService
  ) { }

  setCurrentUpdateStatus(status:any): void {
    this.statusUpdatePolicies.next(status);
  }

  getPolicies(page: number, per_page?: number, query?: string): Observable<any> {
    console.log()
    let queryParams = new HttpParams();
    if (per_page) {
      queryParams = queryParams.append("page",page);
      queryParams = queryParams.append("per_page",per_page);
      
    } else {
      queryParams = queryParams.append("page",page);
    }
    if (query) {
      queryParams = queryParams.append("query",query);
    }

    return this.http.getQuery('getParams', 'brand/policies', {params:queryParams}).pipe(map((resp) => resp as any));

  }

  assignPolicy(data:any){
    return this.http.getQuery('post', 'brand/assign/policy', data).pipe(map((resp) => resp as any));
  }
}