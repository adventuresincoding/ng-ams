import { DeviceHardware } from "../hardware/hardware.model";

export class Desk {
    public Desk() {
        this.assignedDevices = new Array<DeskAssignedDevice>();
    }

    public deskId?: number;
    public deskNo?: number;
    public computerName?:string;
    public location?: string;
    public description?: string;

    public assignedDevices?: Array<DeskAssignedDevice>
}

export class DeskAssignedDevice {
    public assignedId?: number;
    public deskId?: number;
    public deviceId?: number;
    public selected?: boolean;
    public desk?: Desk
    public Device?: DeviceHardware
}

export class DeskConfigViewModel {
    public DeskConfigViewModel() {
        this.hardwareList = new Array<DeviceHardware>();
    }
    public selected?:boolean;
    public deviceName?: string;
    public lookupId?: number;
    public hardwareList?: Array<DeviceHardware>
}