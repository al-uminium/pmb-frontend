import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Expenditure } from '../classes/expenditure';
import { Expense } from '../classes/expenses';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private readonly http = inject(HttpClient);
  private readonly postUrl = "http://localhost:8080/api/post"
  private readonly getUrl = "http://localhost:8080/api/get"

  createExpenditure(expenditure: Expenditure): Observable<any> {
    return this.http.post<Expenditure>( `${this.postUrl}/initializeexpenditure`, expenditure)
  }

  createExpense(expense: Expense, path: string): Observable<any> {
    return this.http.post<Expense>(`${this.postUrl}/expense/${path}`, expense)
  }

  getExpenditureDetails(inviteToken: string): Observable<Expenditure> {
    return this.http.get<Expenditure>(`${this.getUrl}/expenditure/${inviteToken}`)
  }


  getExpensesForOwner(inviteToken: string, ownerId: string): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${this.getUrl}/expenditure/expenses/user/${ownerId}&${inviteToken}`)
  }

  getExpensesWhereUserOwes(inviteToken: string, uid: string): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${this.getUrl}/expenditure/expenses/user/${uid}&${inviteToken}&owes`)
  }

  getExpensesForExpenditure(inviteToken: string) {

  }

}
