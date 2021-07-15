import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EmployeeComponent } from "./employee/employee.component";
import { SalaryRuleComponent } from './salary-rule/salary-rule.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { SalaryRuleListComponent } from './salary-rule-list/salary-rule-list.component';
import { UpdateSalaryRuleComponent } from './update-salary-rule/update-salary-rule.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { CreateSalaryRuleComponent } from './create-salary-rule/create-salary-rule.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'salaryrules', component: SalaryRuleComponent

  },
  {
    path: 'employees', component: EmployeeComponent
  },
  {
    path: 'createSalaryRules/:ci', component: CreateSalaryRuleComponent
  },
  {
    path: 'employee-list', component: EmployeeListComponent
  },
  {
    path: 'salaryrules-list', component: SalaryRuleListComponent
  }
  ,
  {
    path: 'updateEmployee/:ci', component: UpdateEmployeeComponent
  }
  ,
  {
    path: 'updateSalaryRule/:ci', component: UpdateSalaryRuleComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
