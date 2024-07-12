import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaypalService {
  private readonly http = inject(HttpClient)

  private readonly paypalApi = "http://localhost:8080/api/paypal"

  getLinkPaypalAccount(): Observable<any> {
    return this.http.get(`${this.paypalApi}/link-account`);
  }

  createOrder(amount: string, payeeEmail: string): Observable<any> {
    return this.http.post(`${this.paypalApi}/create-order`, { amount, payeeEmail })
  }

  captureOrder(orderId: string, payerId: string): Observable<any> {
    return this.http.post(`${this.paypalApi}/capture-order`, { orderId, payerId })
  }
}
