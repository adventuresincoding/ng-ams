import { Contact } from './../contact/contact';
import { Address } from './../address/address';
export class Employee {
    /**
     *
     */
    constructor() {
        this.empContactDetail = new Array<Contact>();
        this.address = new Array<Address>();
    }
    public employeeId:number;
    public firstName: string;
    public middleName?: string;
    public lastName: string;
    public gender: number;
    public dateOfBirth: Date;
    public marriedStatus?: number;
    public empContactDetail: Array<Contact>;
    public address: Array<Address>;
    public fatherName: string;
    public motherName: string;
    public guardianName: string;
    public fullName:string;
    get employeeFullName(){
        return this.firstName + ' ' + this.lastName;
    }
    set employeeFullName(val){
         this.fullName = val;
    }
}