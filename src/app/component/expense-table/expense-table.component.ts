import { Component, Input, OnInit } from '@angular/core';
import { Expense } from '../../classes/expenses';
import { ProfilePictureComponent } from '../utility/profile-picture/profile-picture.component';
import { User } from '../../classes/user';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroChevronDoubleRight } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-expense-table',
  standalone: true,
  imports: [ProfilePictureComponent, NgIconComponent],
  providers: [provideIcons({ heroChevronDoubleRight })],
  templateUrl: './expense-table.component.html',
  styleUrl: './expense-table.component.css'
})
export class ExpenseTableComponent{
  @Input()
  expenses!: Expense[]; 

  @Input()
  currency!: string;

  @Input()
  user!: User;

  usersInvolvedWoOwner!: User[]
}
