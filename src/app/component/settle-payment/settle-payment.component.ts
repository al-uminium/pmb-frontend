import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NgIconComponent } from '@ng-icons/core';
import { BackendService } from '../../service/backend.service';
import { User } from '../../classes/user';
import { Expense } from '../../classes/expenses';
import { ExpenseTableComponent } from '../expense-table/expense-table.component';
import { ProfilePictureComponent } from '../profile-picture/profile-picture.component';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-settle-payment',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, NgIconComponent, ExpenseTableComponent, ProfilePictureComponent],
  templateUrl: './settle-payment.component.html',
  styleUrl: './settle-payment.component.css'
})
export class SettlePaymentComponent implements OnInit{
  private readonly actRoute = inject(ActivatedRoute);
  private readonly bkSvc = inject(BackendService);
  private readonly fb = inject(FormBuilder);

  inviteToken!: string;
  uid!: string;
  payment!: { [key: string]: number }
  users!: User[]
  user!: User
  expenses!: Expense[]
  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.fb.group({
      settlePayment: this.fb.array([])
    })
    this.actRoute.queryParams.subscribe(params => {
      this.inviteToken = params['exid'];
      this.uid = params['uid'];
      this.bkSvc.getUsersOfExpenditure(this.inviteToken).subscribe(data => {
        this.users = data
        this.users.forEach(user => {
          if (user.userId == this.uid) {
            this.user = user;
          } 
        });
      });
      this.bkSvc.getPaymentsToSettle(this.inviteToken, this.uid).subscribe(data => {
        console.log(data);
        this.payment = data
      });
      this.bkSvc.getExpensesWhereUserOwes(this.inviteToken, this.uid).subscribe(data => {
        console.log(data);
        this.expenses = data
        this.populateSettlePayment();
      });
    })


  }

  get settlePayment() {
    return this.form.get('settlePayment') as FormArray
  }

  populateSettlePayment(): void {
    this.expenses.forEach(() => this.settlePayment.push(this.fb.control<boolean>(false)))
  }
}
