import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { EmployeeComponent } from '../employee/employee.component';

@Injectable({
  providedIn: 'root'
})
export class SalaryRuleService {
  private url = 'http://localhost:8080/api/v1/salaryRule';

  constructor(private http: HttpClient) {
  }

  getAllSalaryRule(): Observable<any> {
    return this.http.get(this.url).pipe(
      map(response => response), catchError(error => {
        alert(error.error);
        return error;
      }
      )
    );
  }


  getSalaryRuleByCi(ci: string): Observable<any> {
    return this.http.get(this.url + "/" + ci).pipe(
      map(response => response), catchError(error => {
        alert(error.error);
        return error;
      }
      )
    );
  }

  createSalaryRule(salaryrule: object): Observable<any> {
    return this.http.post(this.url + "/", salaryrule);
  }

  deleteSalaryRule(id: number): Observable<any> {
    return this.http.delete(this.url + "/" + id).pipe(
      map(response => response), catchError(error => {
        alert(error.error);
        return error;
      }
      )
    );
  }

  updateSalaryRule(ci: string, value: any): Observable<any> {  
    return this.http.put(this.url + "/"+ ci, value);  
  }  

}

