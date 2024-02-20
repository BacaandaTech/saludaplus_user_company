import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { Observable, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StripeService {

  constructor(
    private http: HttpClientService
  ) { }

  buySuscription(data: FormData, oxxo = false): Observable<any> {
    return this.http.getQuery('post', `payment-gateway/${oxxo ? 'payment-oxxo' : 'subscribe-policies'}`, data).pipe(map((resp) => resp as any));
  }
  addPaymentMethod(data: FormData): Observable<any> {
    return this.http.getQuery('post', 'payment-gateway/add-source/', data).pipe(map((resp) => resp as any));
  }
  getCustomerStripe(): Observable<any> {
    return this.http.getQuery('get', 'payment-gateway/get-customer/', {}).pipe(map((resp) => resp as any));
  }
}