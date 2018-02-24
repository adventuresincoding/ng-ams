export class SearchCriteria {
    /**
     *
     */
    constructor() {
        
    }
    public id?: number;
    public name?: string
    public pageNumber?: number;
    public pageSize?: number;
    public totalRows?: number;
}

export class HardwareSearchCriteria extends SearchCriteria {
    /**
     *
     */
    constructor() {
        super();
    }

    public brand?: string;
    public serialNo?: string;
    public uniqueId?: string;
    public hardwareTypeId?: number;
}

export class SoftwareSearchCriteria extends SearchCriteria{
    /**
     *
     */
    constructor() {
        super();
        
    }
    public softwareType?:number;
    public softwareName?:string;
    public dept?:number;
}

export class DeskSearchCriteria extends SearchCriteria{
    constructor(){
        super();
    }
    public deskId?:number;
    public location?:string;
    public deskNo?:string;
}

