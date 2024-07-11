import { Component, OnInit, inject } from '@angular/core';
import { BackendService } from '../../service/backend.service';
import { User } from '../../classes/user';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Expense } from '../../classes/expenses';
import { Observable } from 'rxjs';
import { Expenditure } from '../../classes/expenditure';
import { CommonModule } from '@angular/common';
import { select, Store, StoreModule } from '@ngrx/store';
import { selectSelectedUser } from '../../state/user.selectors';
import { ProfilePictureComponent } from '../utility/profile-picture/profile-picture.component';

@Component({
  selector: 'app-balance',
  standalone: true,
  imports: [RouterModule, CommonModule, StoreModule, ProfilePictureComponent],
  templateUrl: './balance.component.html',
  styleUrl: './balance.component.css'
})
export class BalanceComponent implements OnInit {
  private readonly bkSvc = inject(BackendService);
  private readonly actRoute = inject(ActivatedRoute);
  private readonly store = inject(Store)
  private readonly router = inject(Router)

  selectedUser$!: Observable<User | null>;
  expenditure$!: Observable<Expenditure>;
  usersBalance$!: Observable<User[]>
  settlements$!: Observable<{ [username: string]: {[name: string] : number } }>
  
  inviteToken!: string;
  users!: User[]
  showModal: boolean = false;
  paymentsToSettle!: { [username: string]: {[name: string] : number } }

  ngOnInit(): void {
    this.actRoute.paramMap.subscribe(param => {
      this.inviteToken = param.get('id') as string;
      this.expenditure$ = this.bkSvc.getExpenditureDetails(this.inviteToken);
      // this.usersBalance$ = this.bkSvc.getBalanceOfExpenditure(this.path);
      this.settlements$ = this.bkSvc.getPaymentsToSettle(this.inviteToken);
      this.selectedUser$ = this.store.pipe(select(selectSelectedUser));

      // this.bkSvc.getBalanceOfExpenditure(this.path).subscribe(data => {
      //   this.users = data;
      //   this.bkSvc.getPaymentsToSettle(this.path).subscribe(data => {
      //     this.paymentsToSettle = data
      //     console.log("Printing out payments to settle... ");
      //     console.log(this.paymentsToSettle);
      //   })
      //   console.log(data);
      // });
    })
  }

  handleRepay(selectedUser: User, user: User, amount: number) {
    const expenseName = `Repayment: ${selectedUser.userName} to ${user.userName} for ${amount}`
    const expenseSplit = {} as { [key: string]: number };
    expenseSplit[selectedUser.userName] = amount;
    expenseSplit[user.userName] = amount;
    const usersInvolved = [user];
    const expense = new Expense(expenseName, selectedUser, amount, expenseSplit, usersInvolved, "", "");    
    this.bkSvc.createExpense(expense, this.inviteToken).subscribe(() => {
      this.bkSvc.getBalanceOfExpenditure(this.inviteToken).subscribe(data => {
        this.users = data;
        this.bkSvc.getPaymentsToSettle(this.inviteToken).subscribe(data => {
          this.paymentsToSettle = data
          console.log(this.paymentsToSettle);
        })
      })
    })
  }

  handleRouteToExpense() {
    this.router.navigate([`/expenditure/${this.inviteToken}`])
  }
}
