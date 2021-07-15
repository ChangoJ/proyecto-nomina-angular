import { Component, OnInit } from '@angular/core';
import { SalaryRuleService } from '../api/salary-rule.service'; 
import {SalaryRuleModel} from '../models/salary-rule.model'; 
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { EmployeeModel } from '../models/employee.model';

@Component({
  selector: 'app-salary-rule-list',
  templateUrl: './salary-rule-list.component.html',
  styleUrls: ['./salary-rule-list.component.scss']
})
export class SalaryRuleListComponent implements OnInit {

  public salaryRules: SalaryRuleModel[];
  public employees: EmployeeModel[];
  
  constructor(private route: ActivatedRoute, private salaryRuleService: SalaryRuleService,private router: Router) {
    this.salaryRules = [];
    this.employees = [];
  }

 
  navMenu=[
    {
      name:"Nomina",
      route:"/salaryrules"
    },
    {
      name:"Registro de empleado",
      route:"/employees"
    },
    
    {
      name:"Busqueda de empleados",
      route:"/employee-list"
    },
    {
      name:"Busqueda de Nominas",
      route:"/salaryrules-list"
    },
    {
      name:"Cerrar sesión",
      route:""
    }
  ];
  

  
  deleteSalaryRule(id: number) {
    this.salaryRuleService.deleteSalaryRule(id)
      .subscribe(
          data => this.salaryRules = data
      );
  }

   updateSalaryRule(ci: string){
    this.router.navigate(['updateSalaryRule',ci]);
  }

  searchText = "";
  ci2 = this.searchText;
  
  sync(): void {
    if (this.ci2 !== null) this.salaryRuleService.getSalaryRuleByCi(this.ci2).subscribe(
      data => this.salaryRules = data
    );
  }

  sync2(): void {
    this.salaryRuleService.getAllSalaryRule().subscribe(
      data => this.salaryRules = data
    );
  }

  
 

  ngOnInit(): void {
    this.canBeActivate();
    this.sync2();
  }



  canBeActivate(): void {
    if (localStorage.getItem('user') === '' || localStorage.getItem('user') === null) this.router.navigate([''])
  }
}

