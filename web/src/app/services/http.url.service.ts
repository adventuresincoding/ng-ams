

export class HttpUrlService {

    public static admin = { AddUser: 'Admin/AddUser', UpdateUser: 'Admin/UpdateUser', GetUserById: 'Admin/GetUserById' }

    public static role = { AddRole: 'Admin/AddRole', UpdateRole: 'Admin/UpdateRole', GetRoleById: 'Admin/GetRoleById' }

    public static assignRole = { AutoCompleteUserSearch: 'Admin/SearchUser', GetAssignedRoles: 'Admin/SearchAssignedRoles', UpdateRole: 'Admin/UpdateAssignedRole' };

    public static deviceManagement = { AddDevice: 'Device/AddDevice' };

    public static hardwareManagement = { GetDeviceLookupList: 'Hardware/GetDeviceLookup', GetHardwareList: 'Hardware/SearchHardware', AddHardware: 'Hardware/AddHardware', GetHardware: 'Hardware/GetHardware', GetHardwareType: 'Hardware/GetHardwareType' };

    public static referencesManagement = { AddHardwareType: 'Hardware/AddHardwareType' };

    public static softwareManagement = { Search: 'Software/Search', Add: 'Software/Add', Edit: '' }

    public static deskManagement = { ProcessorSearch: '/GetProcessorByName', Get: 'Desk/Get', Add: 'Desk/Add', GetDeskById:'Desk/GetDeskById',
                                        DeskSearch: 'Desk/Search', AutoCompleteDeskNoSearch: 'Desk/GetDeskNo', AutoCompleteEmployeeSearch: 'Desk/GetEmployee', 
                                        AssignDesk: 'Desk/AssignDesk',AssignSoftware:'Desk/AssignSoftware', 
                                        AutoCompleteComputerSearch : 'Desk/GetComputerName' ,GetSoftwareAssignedList:'Desk/GetSoftwareAssignedList'
                                   }
}
