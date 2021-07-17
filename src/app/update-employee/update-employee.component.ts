import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../api/employee.service';
import { EmployeeComponent } from '../employee/employee.component';
import { EmployeeModel } from '../models/employee.model';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.scss']
})
export class UpdateEmployeeComponent implements OnInit {
  static END_POINT = 'employee/:id';
  private  ci: string | null;
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
      this.updateEmployee();
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
  

  updateEmployee():void {
    if (this.ci !== null) {
    this.employeeService.updateEmployee(this.ci, this.employee)
      .subscribe(data => {
        console.log(data);
        this.gotoList();
      }, error => console.log(error));
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

  ngOnInit(): void {
    this.ci = this.route.snapshot.paramMap.get('ci');
    this.canBeActivate();
    this.getEmployee();
  }

  canBeActivate(): void {
    if (localStorage.getItem('user') === '' || localStorage.getItem('user') === null) this.router.navigate([''])
  }

  gotoList() {
    this.router.navigate(['/employee-list']);
  }

  onSubmit(){
    this.updateEmployee();    
  }

}
