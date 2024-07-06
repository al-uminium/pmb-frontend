import { Component, Input } from '@angular/core';
import { Expense } from '../../classes/expenses';

@Component({
  selector: 'app-expense-table',
  standalone: true,
  imports: [],
  templateUrl: './expense-table.component.html',
  styleUrl: './expense-table.component.css'
})
export class ExpenseTableComponent {
  @Input()
  expenses!: Expense[]; 
}
