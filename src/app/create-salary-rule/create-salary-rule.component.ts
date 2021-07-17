import {Component, OnInit} from '@angular/core';
import { SalaryRuleModel } from '../models/salary-rule.model'; 
import { SalaryRuleService } from '../api/salary-rule.service';
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeModel } from '../models/employee.model';
import { EmployeeService } from '../api/employee.service';


@Component({
  selector: 'app-create-salary-rule',
  templateUrl: './create-salary-rule.component.html',
  styleUrls: ['./create-salary-rule.component.scss']
})
export class CreateSalaryRuleComponent implements OnInit {
  /* static END_POINT = 'reports/:ci';*/
  private readonly ci: string | null;  
  public employee: EmployeeModel = {};
  public salaryRule: SalaryRuleModel = {employee:{},
decimoTercero: false,
decimoCuarto: false,
fondosDeReserva: false};
  
  constructor(public fb: FormBuilder,private route: ActivatedRoute, private salaryRuleService: SalaryRuleService,private employeeService: EmployeeService,private router: Router) {
    this.ci = this.route.snapshot.paramMap.get('ci');
    this.myForm = new FormGroup({
      cedula:new FormControl('', [Validators.required, Validators.pattern('[0-9]+'), Validators.minLength(10)]),
      id:new FormControl('', [Validators.required]),
      name:new FormControl ('', [Validators.required]),
      apellido:new FormControl ('', [Validators.required]),
      salario: new FormControl('', [Validators.required, Validators.min(0.00),Validators.max(50000.00)]),
      date:new FormControl ('', [Validators.required]),
      decimoTercero:new FormControl (),
      decimoCuarto:new FormControl (),
      fondosDeReserva:new FormControl (),

    });
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
 myForm: FormGroup;
  


  submit() {
    if (this.myForm.valid) {
      this.salaryRule.employee=this.employee;
      console.log(this.salaryRule);
      if (this.salaryRule !== null) this.salaryRuleService.createSalaryRule(this.salaryRule).subscribe(
        
        data => this.salaryRule = data

      );
      this.gotoList();
    }
    else{
      alert("Rellene todos los campos")
    }
  }

 
  

  getEmployee(): void{
    if (this.ci !== null) {
    this.employeeService.getEmployeeByCi(this.ci)
    .subscribe(data => {
      console.log(data)
      this.employee = data;
    }, error => console.log(error));
  }
  }

  gotoList() {
    this.router.navigate(['/salaryrules-list']);
  }
 

  ngOnInit(): void {
    this.canBeActivate();
    this.getEmployee();
  }

  canBeActivate(): void {
    if (localStorage.getItem('user') === '' || localStorage.getItem('user') === null) this.router.navigate([''])
  }

  navigateToEmployee(salaryRule: SalaryRuleModel): void {
    this.router.navigate(["/salaryRule/" + salaryRule.id]);
  }


}
