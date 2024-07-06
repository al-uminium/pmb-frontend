import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroUserPlus, heroXMark } from '@ng-icons/heroicons/outline';
import { User } from '../../classes/user';
import { UtilService } from '../../service/util.service';
import { Expense } from '../../classes/expenses';

@Component({
  selector: 'app-expense-modal',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, NgIconComponent],
  providers: [provideIcons({heroXMark, heroUserPlus})],
  templateUrl: './expense-modal.component.html',
  styleUrl: './expense-modal.component.css'
})
export class ExpenseModalComponent implements OnInit{
  private readonly fb = inject(FormBuilder);
  private readonly utilSvc = inject(UtilService);

  form!: FormGroup;

  splitMethods: string[] = ['Evenly', 'Custom']
  
  @Input()
  usersList!: User[]

  @Input()
  selectedUser!: User

  @Output()
  createExpenseEvent: EventEmitter<Expense> = new EventEmitter<Expense>

  ngOnInit(): void {
    this.form = this.fb.group({
      expenseName: this.fb.control<string>('', Validators.required),
      totalCost: this.fb.control<number>(0, Validators.compose([Validators.required, Validators.min(0)])),
      usersInvolved: this.fb.control<User>(this.usersList.at(0) as User, Validators.required),
      costIncurred: this.fb.array([])
    })
    this.populateCostIncurredArray()
  }

  get costIncurred () {
    return this.form.get('costIncurred') as FormArray
  }

  populateCostIncurredArray(): void {
    this.usersList.forEach(() => {
      this.costIncurred.push(this.fb.control<number>(0, Validators.min(0)))
    });
  }

  handleSplitEvenly(): void {
    console.log(this.form.get('totalCost')?.value);
    const totalCost = this.form.get('totalCost')?.value
    if (totalCost > 0) {
      const splitAmt = totalCost / this.usersList.length;
      this.costIncurred.controls.forEach(control => {
        control.setValue(splitAmt.toFixed(2));
      });
      console.log(splitAmt.toFixed(2));
    }
  }

  handleSplitMethod(method: string) {
    switch(method) {
      case 'Evenly':
        this.handleSplitEvenly();
        break;
      case 'Custom':
        console.log('wee');
        break;
    }
  }

  handleSubmit(): void {
    const expenseName = this.form.get('expenseName')?.value;
    const totalCost = this.form.get('totalCost')?.value;
    const usersInvolved = this.utilSvc.getUsersInvolved(this.costIncurred, this.usersList);
    const expenseSplit = this.utilSvc.getExpenseSplit(this.costIncurred, this.usersList);
    const expense = new Expense(expenseName, this.selectedUser, totalCost, expenseSplit, usersInvolved, "", "");
    // console.log(expense);
    this.createExpenseEvent.emit(expense);
  }
}
