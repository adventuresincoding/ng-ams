import { Desk } from "./desk.model";
import { Employee } from "../employee/employee.model";

export class EmployeeAssignedDesk {
    public deskAssignedId?: number;
    public deskId?: number;
    public employeeId?: number;
    public isActive?: boolean

    public Desk?: Desk;
    public Employee?: Employee
}