import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { BehaviorSubject, Observable, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CollaboratorsService {
  private statusUpdateCollaborators: BehaviorSubject<any> = new BehaviorSubject(undefined);
  public readonly currentStatusUpdateComunicates: Observable<any> = this.statusUpdateCollaborators.asObservable();

  constructor(
    private http: HttpClientService
  ) { }

  setCurrentUpdateStatus(status:any): void {
    this.statusUpdateCollaborators.next(status);
  }

  getCollaborators(page: number, per_page?: number, query?: string): Observable<any> {
    var body: any = {};
    if (per_page) {
      body = {
        page: page,
        per_page: per_page
      }
    } else {
      body = {
        page: page,
      }
    }
    if (query) {
      body['query'] = query;
    }

    return this.http.getQuery('post', 'brand/list/collaborator/', body).pipe(map((resp) => resp as any));

  }
}