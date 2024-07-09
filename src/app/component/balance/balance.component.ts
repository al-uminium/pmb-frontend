import { Component, OnInit, inject } from '@angular/core';
import { BackendService } from '../../service/backend.service';
import { User } from '../../classes/user';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Expense } from '../../classes/expenses';
import { ExpenseModalComponent } from '../expense-modal/expense-modal.component';

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
  path!: string;
  users!: User[]
  showModal: boolean = false;
  paymentsToSettle!: { [username: string]: {[name: string] : number } }

  ngOnInit(): void {
    this.actRoute.paramMap.subscribe(param => {
      this.path = param.get('id') as string;
      this.bkSvc.getBalanceOfExpenditure(this.path).subscribe(data => {
        this.users = data;
        this.bkSvc.getPaymentsToSettle(this.path, this.users[0].userId).subscribe(data => {
          this.paymentsToSettle = data
          console.log("Printing out payments to settle... ");
          console.log(this.paymentsToSettle);
        })
        console.log(data);
      });
    })
  }

  handleRepay(selectedUser: User, user: User, amount: number) {
    const expenseName = `Repayment: ${selectedUser.userName} to ${user.userName} for ${amount}`
    const expenseSplit = {} as { [key: string]: number };
    expenseSplit[selectedUser.userName] = amount;
    expenseSplit[user.userName] = amount;
    const usersInvolved = [user];
    const expense = new Expense(expenseName, selectedUser, amount, expenseSplit, usersInvolved, "", "");    
    this.bkSvc.createExpense(expense, this.path).subscribe(() => {
      this.bkSvc.getBalanceOfExpenditure(this.path).subscribe(data => {
        this.users = data;
        this.bkSvc.getPaymentsToSettle(this.path, this.users[0].userId).subscribe(data => {
          this.paymentsToSettle = data
          console.log(this.paymentsToSettle);
        })
      })
    })
  }
}
