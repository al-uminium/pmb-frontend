import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../classes/user';
import { environment as environmentDev } from '../../environments/environment.development';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaypalService {
  private readonly http = inject(HttpClient)
  private readonly paypalApi = environment.production ? `${environment.prodUrl}/api/paypal` : `${environmentDev.devUrl}/api/paypal`

  getLinkPaypalAccount(): Observable<any> {
    return this.http.get(`${this.paypalApi}/link-account`);
  }

  linkPaypalAccountCallback(code: string, authUser: User): Observable<any> {
    return this.http.post(`${this.paypalApi}/link-account/code=${code}`, authUser)
  }

  createOrder(amount: string, payeeEmail: string): Observable<any> {
    return this.http.post(`${this.paypalApi}/create-order`, { amount, payeeEmail })
  }

  captureOrder(orderId: string, payerId: string): Observable<any> {
    return this.http.post(`${this.paypalApi}/capture-order`, { orderId, payerId })
  }
}
