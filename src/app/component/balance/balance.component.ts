import { Component, OnInit, inject } from '@angular/core';
import { BackendService } from '../../service/backend.service';
import { User } from '../../classes/user';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-balance',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './balance.component.html',
  styleUrl: './balance.component.css'
})
export class BalanceComponent implements OnInit {
  private readonly bkSvc = inject(BackendService);
  private readonly actRoute = inject(ActivatedRoute);
  users!: User[]
  paymentsToSettle!: { [username: string]: {[name: string] : number } }

  ngOnInit(): void {
    // this.actRoute.queryParams.subscribe(params => {
    //   this.inviteToken = params['exid'];
    this.actRoute.paramMap.subscribe(param => {
      this.bkSvc.getBalanceOfExpenditure(param.get('id') as string).subscribe(data => {
        this.users = data;
        this.bkSvc.getPaymentsToSettle(param.get('id') as string, this.users[0].userId).subscribe(data => {
          this.paymentsToSettle = data
          console.log(this.paymentsToSettle);
        })
        console.log(data);
      });
    })
  }

  handleRepay(user: User) {
    console.log(user);
  }
}
