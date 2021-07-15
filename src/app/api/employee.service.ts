import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {catchError, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private url = 'http://localhost:8080/api/v1/employee';

  constructor(private http: HttpClient) {
  }

  getAllEmployee(): Observable<any> {
    return this.http.get(this.url).pipe(
      map(response => response), catchError(error => {
          alert(error.error);
          return error;
        }
      )
    );
  }

 
  getEmployeeByCi(ci: String): Observable<any> {
    return this.http.get(this.url + "/" + ci).pipe(
      map(response => response), catchError(error => {
          alert(error.error);
          return error;
        }
      )
    );
  }


createEmployee(employee: object): Observable<object> {
  return this.http.post(this.url+"/", employee);
}

deleteEmployee(id: number): Observable<any> {
  return this.http.delete(this.url+"/"+ id).pipe(
      map(response => response), catchError(error => {
          alert(error.error);
          return error;
        }
      )
    );  
}

updateEmployee(ci: String, value: any): Observable<Object> {  
  return this.http.put(this.url + "/"+ ci, value);  
}  


}
