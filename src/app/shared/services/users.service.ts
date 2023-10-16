import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { BehaviorSubject, Observable, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class usersService {
  private statusUpdateUsers: BehaviorSubject<any> = new BehaviorSubject(undefined);
  public readonly currentStatusUpdateUsers: Observable<any> = this.statusUpdateUsers.asObservable();

  constructor(
    private http: HttpClientService
  ) { }

  setCurrentUpdateStatus(status:any): void {
    this.statusUpdateUsers.next(status);
  }

  getUsers(page: number, per_page?: number, query?: string): Observable<any> {
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

    return this.http.getQuery('post', 'brand/users/', body).pipe(map((resp) => resp as any));

  }

  createUser(data:any){
    return this.http.getQuery('post', 'rand/create/users/', data).pipe(map((resp) => resp as any));
  }

  deleteUser(userId:string){
    return this.http.getQuery('delete', `brand/collaborator//${userId}`,null).pipe(map((resp) => resp as any));
    
  }
}