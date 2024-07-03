import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  inviteToken!: string;

  private readonly actRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.actRoute.paramMap.subscribe(params => {
      this.inviteToken = params.get('id') as string
      console.log(this.inviteToken);
    });
  }
}
