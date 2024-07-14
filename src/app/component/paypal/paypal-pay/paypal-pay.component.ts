import { Component, inject, OnInit } from '@angular/core';
import { PaypalService } from '../../../service/paypal.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-paypal-pay',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './paypal-pay.component.html',
  styleUrl: './paypal-pay.component.css'
})
export class PaypalPayComponent implements OnInit{
  private readonly paypalSvc = inject(PaypalService)
  // private readonly router = inject(Router)
  private readonly actRoute = inject(ActivatedRoute)

  orderId!: string
  payerId: string = 'A6EDG96W5TGXG';

  ngOnInit(): void {
    this.actRoute.queryParams.subscribe(params => {
      this.orderId = params['paymentId'];

    })
  }

  pay() {
    const amt = '10.00';
    const payeeEmail = 'sb-y7hpg31645170@personal.example.com' //personal account

    this.paypalSvc.createOrder(amt, payeeEmail).subscribe((response: any) => {
      window.location.href = response.approvalUrl
    })
  }

  capturePayment(orderId: string, payerId: string) {
    this.paypalSvc.captureOrder(orderId, payerId).subscribe((response: any) => {
      if (response.status === 'approved') {
        alert(`Payment Successful!`);
      } else {
        alert('Payment failed :(');
      }
    })
  }
}
