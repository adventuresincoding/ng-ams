import { HardwareFeature} from './hardware.feature';

export class DeviceHardware {
  public deviceId?: number;  
  public hardwareType?: number;
  public sNo?: string;
  public uniqueId?: string;
  public brand?: string;
  public warranty?: Date;
  public description?: string;
  public selected?:boolean;
  public hardwareFeature ?:Array<HardwareFeature>;
}
