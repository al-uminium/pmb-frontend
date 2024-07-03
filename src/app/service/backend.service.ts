import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Expenditure } from '../classes/expenditure';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private readonly http = inject(HttpClient);
  private readonly postUrl = "http://localhost:8080/api/post/"
  private readonly getUrl = "http://localhost:8080/api/get/"

  createExpenditure(expenditure: Expenditure): Observable<any> {
    return this.http.post<Expenditure>(this.postUrl+"initializeexpenditure", expenditure)
  }

  getExpenditureDetails(inviteToken: string): Observable<any> {
    return this.http.get(this.getUrl+`expenditure/${inviteToken}`)
  }

  getExpensesForExpenditure(inviteToken: string) {

  }

}
