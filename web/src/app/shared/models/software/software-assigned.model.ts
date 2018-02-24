import { Software } from "./software.model";
import { Desk } from "../desk/desk.model";

export class SoftwareAssigned {
    public softwareAssignedId?: number;
    public softwareId?: number;
    public deskId?:number;
    public isActive?: boolean;
    public isAssigned?:boolean;
    public software?: Software
    public  Desk?:Desk;

}