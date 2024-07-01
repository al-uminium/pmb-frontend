import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-landingpage',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.css'
})
export class LandingpageComponent {
  private readonly router = inject(Router);

  onCreateExpeditionClick(): void {
    this.router.navigate(["/createexpenditure"]);
  }
}
