export class AssetLookup {
  public lookupId?: number;
  public lookupName?: string;
  public assetLookupType?:Array<AssetLookupType>;

  /**
   *
   */
  constructor() {
    this.assetLookupType = new Array<AssetLookupType>();
  }
}

export class AssetLookupType {
  public lookupTypeId?: number;
  public lookupId?: number;
  public lookupTypeName?: string;

  public lookup?: AssetLookup
  public assetLookupTypesFeature?: Array<AssetLookupTypesFeature>;

  /**
   *
   */
  constructor() {
    this.assetLookupTypesFeature = new Array<AssetLookupTypesFeature>();
  }
}

export class AssetLookupTypesFeature {
  public featureId?: number;
  public lookupTypeId?: number;
  public propertyValue?: string;
  public lookupType?: AssetLookupType
  public selected?: boolean;
  public required?:boolean;
}
