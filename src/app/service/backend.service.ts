import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Expenditure } from '../classes/expenditure';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private readonly http = inject(HttpClient);
  private readonly expUrl = "http://localhost:8080/api/post/initializeexpenditure"

  createExpenditure(expenditure: Expenditure): Observable<any> {
    return this.http.post<Expenditure>(this.expUrl, expenditure)
  }

  getExpensesForExpenditure(inviteToken: string) {

  }
  
}
