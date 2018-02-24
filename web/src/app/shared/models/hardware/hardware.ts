import { DeviceHardware } from "./hardware.model";
import { AssetLookupTypesFeature } from "../lookup/lookup.model";

export class Hardware {
    public hardwareId?: number;
    public hardwareName?: string;
    public deviceId?: number;
    public featureId?: number;
    public device?: DeviceHardware;
    public feature?: AssetLookupTypesFeature;
}