import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from '../../service/backend.service';
import { Expenditure } from '../../classes/expenditure';
import { User } from '../../classes/user';
import { ExpenseTableComponent } from '../expense-table/expense-table.component';
import { SelectUserModalComponent } from '../select-user-modal/select-user-modal.component';
import { Expense } from '../../classes/expenses';
import { ExpenseModalComponent } from '../expense-modal/expense-modal.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ExpenseTableComponent, SelectUserModalComponent, ExpenseModalComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  inviteToken!: string;
  expenditure!: Expenditure;
  users!: User[]
  showUserModal: boolean = true;
  selectedUser!: User;
  expenses!: Expense[];
  showExpenseModal: boolean = false;

  @Input()
  createdExpense!: Expense

  private readonly actRoute = inject(ActivatedRoute);
  private readonly bkSvc = inject(BackendService);

  ngOnInit(): void {
    this.actRoute.paramMap.subscribe(params => {
      this.inviteToken = params.get('id') as string
      this.bkSvc.getExpenditureDetails(this.inviteToken).subscribe({
        next: (data) => {
          this.expenditure = data;
          this.users = data.users;
          this.expenses = data.expenses;
          console.log(data);
        }
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
    this.selectedUser = user;
    console.log(this.selectedUser);
    this.toggleUserModal();
  }

  setExpense(expense: Expense) {
    this.createdExpense = expense;
    this.bkSvc.createExpense(this.createdExpense, this.inviteToken).subscribe({
      next: () => {
        this.bkSvc.getExpenditureDetails(this.inviteToken).subscribe((data) => {
          this.expenditure = data;
          this.users = data.users;
          this.expenses = data.expenses;
        })
      }
    })
  }
}
