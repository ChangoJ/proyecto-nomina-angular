import { Component, OnInit } from '@angular/core';
import { EmployeeModel } from '../models/employee.model'; 
import { EmployeeService } from '../api/employee.service'; 
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  public employees: EmployeeModel[];
  
  constructor(private route: ActivatedRoute, private employeeService: EmployeeService,private router: Router) {
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
  

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id)
      .subscribe(
          data => this.employees = data
      );
  }

   updateEmployee(ci: number){
    this.router.navigate(['updateEmployee', ci]);
  }

  addSalaryRuleEmployee(ci: number){
    this.router.navigate(['createSalaryRules', ci]);
  }
    

  searchText = '';
  ci2 = this.searchText;
  
  sync(): void {
    if (this.ci2 !== null) this.employeeService.getEmployeeByCi(this.ci2).subscribe(
      data => this.employees = data
    );
  }

  sync2(): void {
    this.employeeService.getAllEmployee().subscribe(
      data => this.employees = data
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
