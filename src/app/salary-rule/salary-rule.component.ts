import { Component, OnInit } from '@angular/core';
import { EmployeeModel } from '../models/employee.model';
import { EmployeeService } from '../api/employee.service';
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SalaryRuleModel } from '../models/salary-rule.model';
import { SalaryRuleService } from '../api/salary-rule.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-salary-rule',
  templateUrl: './salary-rule.component.html',
  styleUrls: ['./salary-rule.component.scss']
})
export class SalaryRuleComponent implements OnInit {
  static END_POINT = 'salaryRule/:ci';
  private ci: string | null = null;
  public salaryRule: SalaryRuleModel;
  myForm2: FormGroup;
  searchText = '';
  public cuarto = 0;
  public tercero = 0;
  public fondo = 0;

  constructor(public fb: FormBuilder, private route: ActivatedRoute, private salaryRuleService: SalaryRuleService, private router: Router) {
    this.ci = this.route.snapshot.paramMap.get('ci');
    this.salaryRule = { employee: {} };
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
  public sueldoBase = 400;
  public IESS = 0;
  public salary=0;

  calculate(): void {
    if (this.salaryRule.decimoTercero == true && this.salaryRule.salary != undefined) {
      this.tercero = this.salaryRule.salary / 12;
      this.tercero.toFixed(2);
    }
    if (this.salaryRule.decimoCuarto == true && this.salaryRule.salary != undefined) {
      this.cuarto = this.sueldoBase / 12;
      this.cuarto.toFixed(2);
    }
    if (this.salaryRule.fondosDeReserva == true && this.salaryRule.salary != undefined) {
      this.fondo = (this.salaryRule.salary * 8.33) / 100;
      this.fondo.toFixed(2);
    }
    if (this.salaryRule.salary != undefined) {
      this.IESS = (this.salaryRule.salary * 9.45)/100;
      this.IESS.toFixed(2);
    }
    if (this.salaryRule.salary != undefined) {
      this.salary = this.salaryRule.salary;
      this.salary.toFixed(2);
    }
  }

  submit() {
    if (this.myForm2.valid) {
      if (this.searchText !== null) this.salaryRuleService.getSalaryRuleByCi(this.searchText).subscribe(
        data => {
          this.salaryRule = data;
          this.calculate();
        }
      );
    }
  }

  ngOnInit(): void {
    this.canBeActivate();
  }

  canBeActivate(): void {
    if (localStorage.getItem('user') === '' || localStorage.getItem('user') === null) this.router.navigate([''])
  }


}
