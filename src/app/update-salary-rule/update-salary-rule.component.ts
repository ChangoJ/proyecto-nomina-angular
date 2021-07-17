import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SalaryRuleService } from '../api/salary-rule.service';
import { EmployeeModel } from '../models/employee.model';
import { SalaryRuleModel } from '../models/salary-rule.model';

@Component({
  selector: 'app-update-salary-rule',
  templateUrl: './update-salary-rule.component.html',
  styleUrls: ['./update-salary-rule.component.scss']
})
export class UpdateSalaryRuleComponent implements OnInit {
  static END_POINT = 'salaryRule/:ci';
  private ci: string | null;
  public salaryRule: SalaryRuleModel = { employee: {} };


  constructor(public fb: FormBuilder, private route: ActivatedRoute, private salaryRuleService: SalaryRuleService, private router: Router) {
    this.ci = this.route.snapshot.paramMap.get('ci');
    this.myForm3 = new FormGroup({
      name: new FormControl('', [Validators.required]),
      apellido: new FormControl('', [Validators.required]),
      cedula: new FormControl('', [Validators.required, Validators.pattern('[0-9]+'), Validators.minLength(10)]),
      codigo: new FormControl('', [Validators.required]),
      salario: new FormControl('', [Validators.required, Validators.min(0.00), Validators.max(50000.00)]),
      date: new FormControl('', [Validators.required]),
      decimoTercero: new FormControl(),
      decimoCuarto: new FormControl(),
      fondosDeReserva: new FormControl(),
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
  myForm3: FormGroup;



  submit() {
    this.updateSalaryRule();

  }



  updateSalaryRule(): void {
    if (this.ci !== null) {
      this.salaryRuleService.updateSalaryRule(this.ci, this.salaryRule)
        .subscribe(data => {
          console.log(data);
          this.gotoList();
        }, error => console.log(error));
    }
  }

  getSalaryRule(): void {
    if (this.ci !== null) {
      this.salaryRuleService.getSalaryRuleByCi(this.ci)
        .subscribe(data => {
          console.log(data)
          this.salaryRule = data;
        }, error => console.log(error));
    }
  }

  ngOnInit(): void {
    this.ci = this.route.snapshot.paramMap.get('ci');
    this.canBeActivate();
    this.getSalaryRule();
  }

  canBeActivate(): void {
    if (localStorage.getItem('user') === '' || localStorage.getItem('user') === null) this.router.navigate([''])
  }

  gotoList() {
    this.router.navigate(['/salaryrules-list']);
  }

  onSubmit() {
    this.updateSalaryRule();
  }

}
