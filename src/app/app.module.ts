import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {AuthService} from './api/auth.service';
import {EmployeeService} from './api/employee.service';
import { EmployeeComponent } from './employee/employee.component';
import { SalaryRuleComponent } from './salary-rule/salary-rule.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { FilterPipe } from './pipes/filter.pipe';
import { SalaryRuleListComponent } from './salary-rule-list/salary-rule-list.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { UpdateSalaryRuleComponent } from './update-salary-rule/update-salary-rule.component';
import { CreateSalaryRuleComponent } from './create-salary-rule/create-salary-rule.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EmployeeComponent,
    SalaryRuleComponent,
    EmployeeListComponent,
    FilterPipe,
    SalaryRuleListComponent,
    UpdateEmployeeComponent,
    UpdateSalaryRuleComponent,
    CreateSalaryRuleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
  AuthService,
  EmployeeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
