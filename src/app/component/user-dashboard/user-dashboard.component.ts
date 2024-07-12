import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { select, Store, StoreModule } from '@ngrx/store';
import { BackendService } from '../../service/backend.service';
import { Observable } from 'rxjs';
import { User } from '../../classes/user';
import { selectLoginUser } from '../../state/user.selectors';
import { UtilService } from '../../service/util.service';
import { selectUser } from '../../state/user.actions';
import { PaypalLoginComponent } from '../paypal-login/paypal-login.component';
import { PaypalPayComponent } from '../paypal-pay/paypal-pay.component';

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
  private readonly router = inject(Router)
  private readonly util = inject(UtilService)

  selectedUser$!: Observable<User | null>;

  ngOnInit(): void {
    this.onPageLoad()
    this.selectedUser$ = this.store.pipe(select(selectLoginUser));
  }

  onPageLoad() {
    const user = this.util.getUserFromLocalStorage()
    if (user.userId.length > 0) {
      this.store.dispatch(selectUser({ user }));
    }
  }
}
