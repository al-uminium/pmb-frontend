import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from '../../service/backend.service';
import { Expenditure } from '../../classes/expenditure';
import { User } from '../../classes/user';
import { ExpenseTableComponent } from '../expense-table/expense-table.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ExpenseTableComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  inviteToken!: string;
  expenditure!: Expenditure;
  expenditureUsers!: User[]


  private readonly actRoute = inject(ActivatedRoute);
  private readonly bkSvc = inject(BackendService);

  ngOnInit(): void {
    this.actRoute.paramMap.subscribe(params => {
      this.inviteToken = params.get('id') as string
      this.bkSvc.getExpenditureDetails(this.inviteToken).subscribe({
        next: (data) => {
          this.expenditure = data;
          console.log(data);
        }
      })
    });
  }
}
