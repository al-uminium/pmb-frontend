import { Routes } from '@angular/router';
import { LandingpageComponent } from './component/landingpage/landingpage.component';
import { ExpenditureFormComponent } from './component/expenditure-form/expenditure-form.component';

export const routes: Routes = [
  {path: "", component: LandingpageComponent},
  {path: "createexpenditure", component: ExpenditureFormComponent}
];
