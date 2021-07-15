
import { EmployeeModel } from "./employee.model";
export interface SalaryRuleModel {
    id?: string;
    salary?: number;
    decimoTercero?: boolean;
    decimoCuarto?: boolean;
    fondosDeReserva?: boolean;
    paymentDate?:Date;
    employee: EmployeeModel;
}