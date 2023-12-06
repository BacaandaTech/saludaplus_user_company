import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  API_URL: string;

  constructor(private http: HttpClient) {
    this.API_URL = environment.API_URL;
  }

  getQuery(type: string, query: string, parameters: any) {
    const url = `${this.API_URL}${query}`;

    switch (type) {
      case 'post':
        return this.http.post(url, parameters);
      case 'get':
        return this.http.get(url);
      case 'getParams':
        console.log(parameters)
        return this.http.get(url,parameters);
      case 'put':
        return this.http.put(url, parameters);
      case 'delete':
        return this.http.delete(url);
      case 'patch':
        return this.http.patch(url, parameters);
      default:
        return new Observable();
    }
  }
}
