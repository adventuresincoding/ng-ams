import { Desk } from "./desk.model";
import { Software } from "../software/software.model";
import { Employee } from "../employee/employee.model";

export class DeskWithHardware {

    public DeskWithHardware() {
        this.configuration = new Array<HardwareConfiguration>();
        this.softwareList = new Array<Software>();
    }
    public desk?: Desk;
    public configuration?: Array<HardwareConfiguration>

    public hardwareList?: HardwareDetails;
    public softwareList?: Array<Software>;
    public employeeAssigned?:Employee;
}

export class HardwareConfiguration {
    public hardwareType?: string;
    public property?: string;
    public value?: string;
}

export class HardwareDetails {

    public HardwareDetails() {
        this.hardwareSpecificationList = new Array<HardwareSpecification>();
    }
    public computerName?: string;
    public hardwareType?: string;
    public brand?: string
    public sno?: string
    public location?: string;
    public hardwareSpecificationList?: Array<HardwareSpecification>;
}

export class HardwareSpecification {
    public key?: string
    public value?: string
}