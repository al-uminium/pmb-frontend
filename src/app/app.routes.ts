import { Routes } from '@angular/router';
import { LandingpageComponent } from './component/landingpage/landingpage.component';
import { ExpenditureFormComponent } from './component/expenditure-form/expenditure-form.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { SettlePaymentComponent } from './component/settle-payment/settle-payment.component';

export const routes: Routes = [
  {path: "", component: LandingpageComponent},
  {path: "createexpenditure", component: ExpenditureFormComponent},
  {path: "expenditure/:id", component: DashboardComponent},
  {path: "settlepayments", component: SettlePaymentComponent, pathMatch:'full'},
  {path: '**', component: LandingpageComponent}
];
