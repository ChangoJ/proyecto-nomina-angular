import {Component, OnInit} from '@angular/core';
import { EmployeeModel } from '../models/employee.model'; 
import { EmployeeService } from '../api/employee.service'; 
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  /* static END_POINT = 'reports/:ci';*/
  private readonly ci: string | null;
  public employee: EmployeeModel = {};
  
  constructor(public fb: FormBuilder,private route: ActivatedRoute, private employeeService: EmployeeService,private router: Router) {
    this.ci = this.route.snapshot.paramMap.get('ci');
    this.myForm = new FormGroup({
      name:new FormControl ('', [Validators.required]),
      apellido:new FormControl ('', [Validators.required]),
      cedula:new FormControl ('', [Validators.required]),
      cargo:new FormControl ('', [Validators.required]),
      email:new FormControl ('', [Validators.required, Validators.email]),
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
      if (this.employee !== null) this.employeeService.createEmployee(this.employee).subscribe(
        data => this.employee = data
      );
    }
    else{
      alert("Rellene todos los campos")
    }
  }

  sync(): void {
    if (this.ci2 !== null) this.employeeService.getEmployeeByCi(this.ci2).subscribe(
      data => this.employee = data
    );
  }
  
  filterPost = '';
  ci2 = this.filterPost;
  

  

  ngOnInit(): void {
    this.canBeActivate();
  }

  canBeActivate(): void {
    if (localStorage.getItem('user') === '' || localStorage.getItem('user') === null) this.router.navigate([''])
  }

  navigateToEmployee(employee: EmployeeModel): void {
    this.router.navigate(["/employee/" + employee.id]);
  }


}
