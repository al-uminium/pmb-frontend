import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from '../../service/backend.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  inviteToken!: string;
  expenditureName!: string;
  

  private readonly actRoute = inject(ActivatedRoute);
  private readonly bkSvc = inject(BackendService);

  ngOnInit(): void {
    this.actRoute.paramMap.subscribe(params => {
      this.inviteToken = params.get('id') as string
      this.bkSvc.getExpenditureDetails(this.inviteToken).subscribe({
        next: (data) => console.log(data)
      })
    });
  }
}
