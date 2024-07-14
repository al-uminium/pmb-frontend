import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UtilService } from '../../../service/util.service';
import { User } from '../../../classes/user';
import { PaypalService } from '../../../service/paypal.service';

@Component({
  selector: 'app-paypal-callback',
  standalone: true,
  imports: [RouterModule, StoreModule],
  templateUrl: './paypal-callback.component.html',
  styleUrl: './paypal-callback.component.css'
})
export class PaypalCallbackComponent implements OnInit{
  private readonly actRoute = inject(ActivatedRoute)
  private readonly utilSvc = inject(UtilService)
  private readonly paypalSvc = inject(PaypalService);
  private readonly router = inject(Router)

  ngOnInit(): void {
    this.actRoute.queryParamMap.subscribe(params => {
      const authCode = params?.get('code');
      const authUser = this.utilSvc.getAuthUserFromLocalStorage() as User;
      if (authCode && authUser) {
        this.paypalSvc.linkPaypalAccountCallback(authCode, authUser).subscribe((data) => {
          console.log(data);
          this.router.navigate(['user']);
        })
      }
    })
  }
}
