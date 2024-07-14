import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { select, Store, StoreModule } from '@ngrx/store';
import { BackendService } from '../../service/backend.service';
import { Observable } from 'rxjs';
import { User } from '../../classes/user';
import { UtilService } from '../../service/util.service';
import { loginUser, selectUser } from '../../state/user.actions';
import { PaypalLoginComponent } from '../paypal/paypal-login/paypal-login.component';
import { PaypalPayComponent } from '../paypal/paypal-pay/paypal-pay.component';
import { Expenditure } from '../../classes/expenditure';
import { selectAuthUser } from '../../state/user.selectors';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [RouterModule, CommonModule, StoreModule, PaypalLoginComponent, PaypalPayComponent],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent implements OnInit{
  private readonly bkSvc = inject(BackendService);
  private readonly store = inject(Store)
  private readonly util = inject(UtilService)
  private readonly url = "http://localhost:4200/expenditure"

  authUser$!: Observable<User | null>;
  expenditures$!: Observable<Expenditure[]>
  authUser!: User;

  ngOnInit(): void {
    this.onPageLoad();
    this.authUser$ = this.store.pipe(select(selectAuthUser));
    this.authUser$.subscribe((user) => {
      console.log(user);
      this.authUser = user as User
    });
    this.expenditures$ = this.bkSvc.getExpenditureForUser(this.authUser);
    this.expenditures$.subscribe((data) => console.log(data));
  }

  onPageLoad() {
    const authUser = this.util.getAuthUserFromLocalStorage();
    if (authUser) {
      this.store.dispatch(loginUser({ user: authUser }))
    }
  }

  generateUrlForExpenditure(ex : Expenditure): string {
    return `${this.url}/${ex.inviteToken}`;
  }
}
