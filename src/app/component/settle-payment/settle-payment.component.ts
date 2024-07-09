import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NgIconComponent } from '@ng-icons/core';
import { BackendService } from '../../service/backend.service';
import { User } from '../../classes/user';

@Component({
  selector: 'app-settle-payment',
  standalone: true,
  imports: [RouterModule, NgIconComponent],
  templateUrl: './settle-payment.component.html',
  styleUrl: './settle-payment.component.css'
})
export class SettlePaymentComponent implements OnInit{
  private readonly actRoute = inject(ActivatedRoute);
  private readonly bkSvc = inject(BackendService);

  inviteToken!: string;
  uid!: string;
  payment!: { [key: string]: number }
  users!: User[]

  ngOnInit(): void {
    this.actRoute.queryParams.subscribe(params => {
      this.inviteToken = params['exid'];
      this.uid = params['uid'];
      this.bkSvc.getPaymentsToSettle(this.inviteToken, this.uid).subscribe(data => console.log(data));
      // this.bkSvc.getUsersOfExpenditure(this.inviteToken).subscribe(data => this.users = data);
      // this.bkSvc.getPaymentsToSettle(this.inviteToken, this.uid).subscribe(data => this.payment = data);
    })

  }
}
