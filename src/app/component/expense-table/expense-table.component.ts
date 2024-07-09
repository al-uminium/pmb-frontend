import { Component, Input } from '@angular/core';
import { Expense } from '../../classes/expenses';
import { ProfilePictureComponent } from '../profile-picture/profile-picture.component';
import { User } from '../../classes/user';

@Component({
  selector: 'app-expense-table',
  standalone: true,
  imports: [ProfilePictureComponent],
  templateUrl: './expense-table.component.html',
  styleUrl: './expense-table.component.css'
})
export class ExpenseTableComponent {
  @Input()
  expenses!: Expense[]; 

  @Input()
  mode!: string;

  @Input()
  user!: User;
}
