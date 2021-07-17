import { Component, OnInit , ViewChild,ElementRef} from '@angular/core';
import {jsPDF} from 'jspdf';
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SalaryRuleModel } from '../models/salary-rule.model';
import { SalaryRuleService } from '../api/salary-rule.service';


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

  
  @ViewChild('pdfTable', {static: false}) pdfTable?: ElementRef;


  public downloadAsPDF() {
    
    const pdfTable = this.pdfTable?.nativeElement;
    const doc: jsPDF = new jsPDF("landscape", "mm", "a0");
    doc.html(pdfTable, {
      callback: (doc) => {
        doc.output("dataurlnewwindow");
      }
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
  public total =0;
  public totalApagar =0;
  calculate(): void {
    if (this.salaryRule.decimoTercero == true && this.salaryRule.salary != undefined) {
      this.tercero = this.salaryRule.salary / 12;
      this.tercero = Math.round(this.tercero*100.0)/100.0;
    }
    if (this.salaryRule.decimoCuarto == true && this.salaryRule.salary != undefined) {
      this.cuarto = this.sueldoBase / 12;
      this.cuarto = Math.round(this.cuarto*100.0)/100.0;
    }
    if (this.salaryRule.fondosDeReserva == true && this.salaryRule.salary != undefined) {
      this.fondo = (this.salaryRule.salary * 8.33) / 100;
      this.fondo = Math.round(this.fondo*100.0)/100.0;
    }
    if (this.salaryRule.salary != undefined) {
      this.IESS = (this.salaryRule.salary * 9.45)/100;
      this.IESS = Math.round(this.IESS*100.0)/100.0;
    }
    if (this.salaryRule.salary != undefined) {
      this.salary = this.salaryRule.salary;
      this.salary = Math.round(this.salary*100.0)/100.0;
    }
    if (this.salaryRule.salary != undefined) {
      this.total = (this.salary+this.tercero+this.cuarto+this.fondo);
      this.total = Math.round(this.total*100.0)/100.0;
      this.totalApagar = (this.total)-this.IESS;
      this.totalApagar = Math.round(this.totalApagar*100.0)/100.0;
    }
    if (this.salaryRule.salary != undefined) {
     
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
