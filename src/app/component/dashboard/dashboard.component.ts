import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../../service/backend.service';
import { Expenditure } from '../../classes/expenditure';
import { User } from '../../classes/user';
import { ExpenseTableComponent } from '../expense-table/expense-table.component';
import { SelectUserModalComponent } from '../select-user-modal/select-user-modal.component';
import { Expense } from '../../classes/expenses';
import { ExpenseModalComponent } from '../expense-modal/expense-modal.component';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroPlus, heroShare } from '@ng-icons/heroicons/outline';
import { select, Store, StoreModule } from '@ngrx/store';
import { selectUser } from '../../state/user.actions';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { selectSelectedUser } from '../../state/user.selectors';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule, 
    ExpenseTableComponent, 
    SelectUserModalComponent, 
    ExpenseModalComponent, 
    NgIconComponent,
    StoreModule
  ],
  providers: [provideIcons({ heroShare, heroPlus })],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  private readonly actRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly bkSvc = inject(BackendService);
  private readonly store = inject(Store);

  expenditure$!: Observable<Expenditure>;
  selectedUser$!: Observable<User | null>;
  
  inviteToken!: string;
  showUserModal: boolean = true;
  selectedUser!: User;
  expenses!: Expense[];
  showExpenseModal: boolean = false;
  selectedUserExpense!: Expense[]
  selectedUserOwedExpense!: Expense[]

  @Input()
  createdExpense!: Expense

  ngOnInit(): void {
    this.selectedUser$ = this.store.pipe(select(selectSelectedUser));
    this.actRoute.paramMap.subscribe(params => {
      this.inviteToken = params.get('id') as string
      this.expenditure$ = this.bkSvc.getExpenditureDetails(this.inviteToken);
      this.expenditure$.subscribe(expenditure => {
        this.onPageLoad(expenditure);
      })
    });
  }

  toggleUserModal(): void {
    this.showUserModal = !this.showUserModal;
  }

  toggleExpenseModal(): void {
    this.showExpenseModal = !this.showExpenseModal;
  }

  selectUser(user: User): void {
    this.store.dispatch(selectUser({ user }));
    // this.selectedUser = user;
    localStorage.setItem('selectedUser', JSON.stringify({ user }));
    this.toggleUserModal();
  }

  setExpense(expense: Expense) {
    this.createdExpense = expense;
  }

  setExpenseAfterCreating(expense: Expense) {
    this.setExpense(expense);
    this.bkSvc.createExpense(this.createdExpense, this.inviteToken).subscribe({
      next: () => {
        console.log(this.createdExpense.expenseSplit);
        this.expenditure$ = this.bkSvc.getExpenditureDetails(this.inviteToken)
        this.toggleExpenseModal()
      }
    })
  }

  getExpenseForOwner() {
    this.bkSvc.getExpensesForOwner(this.inviteToken, this.selectedUser.userId).subscribe(
      (data) => {
        this.selectedUserExpense = data;
      }
    )
  }

  getExpenseWhereUserOwes() {
    this.bkSvc.getExpensesWhereUserOwes(this.inviteToken, this.selectedUser.userId).subscribe(
      (data) => {
        this.selectedUserOwedExpense = data;
      }
    )
  }

  handleSettlePayments() {
    this.router.navigate(['settlepayments'], { queryParams: {exid: this.inviteToken, uid: this.selectedUser.userId} })
  }

  handleRouteToBalance() {
    this.router.navigate([`/expenditure/${this.inviteToken}/balance`])
  }

  onPageLoad(expenditure: Expenditure) {
    const storedUser = localStorage.getItem('selectedUser');
    console.log("printing stored user");
    if (storedUser) {
      console.log("Stored user is true");
      let isUserInExpenditure = false;
      const userObj = JSON.parse(storedUser);
      console.log(userObj.user.userName);
      expenditure.users.forEach(expenditureUser => {
        const user = expenditureUser as User;
        if (userObj.user.userId == expenditureUser.userId) {
          this.store.dispatch(selectUser({ user }));
          isUserInExpenditure = true;
        } 
      })
      if (isUserInExpenditure) {
        this.showUserModal = false;
      }
    }
  }
}
