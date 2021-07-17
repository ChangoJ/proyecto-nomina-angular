import { Component, OnInit } from '@angular/core';
import { SalaryRuleService } from '../api/salary-rule.service';
import { SalaryRuleModel } from '../models/salary-rule.model';
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { EmployeeModel } from '../models/employee.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-salary-rule-list',
  templateUrl: './salary-rule-list.component.html',
  styleUrls: ['./salary-rule-list.component.scss']
})
export class SalaryRuleListComponent implements OnInit {
  myForm2: FormGroup;
  public salaryRules: SalaryRuleModel[];
  public salaryRule: SalaryRuleModel;

  constructor(private route: ActivatedRoute, private salaryRuleService: SalaryRuleService, private router: Router) {
    this.salaryRule = { employee: {} };
    this.salaryRules = [];
    this.myForm2 = new FormGroup({
      searchText: new FormControl('', [Validators.required, Validators.pattern('[0-9]+'), Validators.minLength(10)]),

    });
  }


  navMenu = [
    {
      name: "Nomina",
      route: "/salaryrules"
    },
    {
      name: "Registro de empleado",
      route: "/employees"
    },

    {
      name: "Busqueda de empleados",
      route: "/employee-list"
    },
    {
      name: "Busqueda de Nominas",
      route: "/salaryrules-list"
    },
    {
      name: "Cerrar sesión",
      route: ""
    }
  ];



  deleteSalaryRule(id: number) {
    this.salaryRuleService.deleteSalaryRule(id)
      .subscribe(
        data => this.salaryRule = data
      );
     
      this.gotoList();
  }

  updateSalaryRule(ci: number) {
    this.router.navigate(['updateSalaryRule', ci]);
  }


  searchText = '';
  
  sync(): void {
    if (this.searchText !== null) this.salaryRuleService.getSalaryRuleByCi(this.searchText).subscribe(
      data => this.salaryRules = data
    );
  }

  sync2(): void {
    this.salaryRuleService.getAllSalaryRule().subscribe(
      data => this.salaryRules = data
    );
  }

  gotoList() {
    window.location.reload();
  }


  ngOnInit(): void {
    this.canBeActivate();
    this.sync2();
  }



  canBeActivate(): void {
    if (localStorage.getItem('user') === '' || localStorage.getItem('user') === null) this.router.navigate([''])
  }
}

