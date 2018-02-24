import { FuseNavigationModelInterface } from '../core/components/navigation/navigation.model';

export class FuseNavigationModel implements FuseNavigationModelInterface
{
    public model: any[];

    constructor()
    {
        this.model = [
            {
                'id'      : 'applications',
                'title'   : 'Applications',
                'translate': 'NAV.APPLICATIONS',
                'type'    : 'group',
                'children': [
                    // {
                    //     'id'   : 'sample',
                    //     'title': 'Sample',
                    //     'translate': 'NAV.SAMPLE.TITLE',
                    //     'type' : 'item',
                    //     'icon' : 'email',
                    //     'url'  : '/sample',
                    //     'badge': {
                    //         'title': 25,
                    //         'translate': 'NAV.SAMPLE.BADGE',
                    //         'bg'   : '#F44336',
                    //         'fg'   : '#FFFFFF'
                    //     }
                    // },
                    {
                        'id'   : 'login',
                        'title': 'Login',
                        'translate': 'LOGIN.LOGIN.TITLE',
                        'type' : 'item',
                        'icon' : 'lock',
                        'url'  : '/auth/login',
                        'badge': {
                            'title': 25,
                            'translate': 'NAV.SAMPLE.BADGE',
                            'bg'   : '#F44336',
                            'fg'   : '#FFFFFF'
                        }
                    },
                    {
                        'id'      : 'dashboards',
                        'title'   : 'Dashboards',
                        'type'    : 'collapse',
                        'icon'    : 'dashboard',
                        'children': [
                            {
                                'id'   : 'project',
                                'title': 'Project',
                                'type' : 'item',
                                'url'  : '/dashboards'
                            }
                        ]
                    },
                    {
                        'id': 'conference',
                        'title': 'Conference',                        
                        'type': 'item',
                        'icon': 'people',
                        'url' :'/conference',                        
                    },
                    {
                        'id'      : 'manageDesk',
                        'title'   : 'Manage Desk',
                        'type'    : 'item',
                        'icon'    : 'computer',
                        'url'     : '/desk',
                        // 'children': [
                        //     {
                        //         'id'   : 'desk',
                        //         'title': 'Desk',
                        //         'type' : 'item',
                        //         'url'  : '/desk'
                        //     },
                        //     {
                        //         'id'   : 'desk',
                        //         'title': 'Assign Desk',
                        //         'type' : 'item',
                        //         'url'  : '/desk'
                        //     }
                        // ]
                    },
                    {
                        'id'      : 'manageDevices',
                        'title'   : 'Manage Devices',
                        'transalate' :'DEVICES.MANAGE-DEVICE',
                        'type'    : 'item',
                        'icon'    : 'devices',
                        'url'     : '/devices/devices/hardware/search',
                        'children': [
                            {
                                'id'   : 'desk',
                                'title': 'Manage Device',
                                // 'translate':'DEVICES.ADD-DEVICE.TITLE',
                                'type' : 'item',
                                'url'  : '/devices/devices'
                            },                              
                                                     
                        ]
                    },
                    {
                        'id': 'software',
                        'title': 'Software',
                        // 'transalate': 'SOFTWARE.MANAGE-SOFTWARE',
                        'type': 'item',
                        'icon': 'apps',
                        'url' :'/software/manage',                        
                    },
                    {
                      'id': 'references',
                      'title': 'References',
                    //   'transalate': 'DEVICES.MANAGE-DEVICE',
                      'type': 'collapse',
                      'icon': 'call_split',
                      'children': [
                        {
                          'id': 'deviceType',
                          'title': 'Add Device Type',
                          'translate': 'DEVICES.ADD-DEVICE.TITLE',
                          'type': 'item',
                          'url': '/references/references/device'
                        },
                        {
                            'id': 'hardwareLookup',
                            'title': 'Add Hardware Type',
                            'translate': 'DEVICES.ADD-DEVICE.TITLE',
                            'type': 'item',
                            'url': '/references/references/hardware'
                          },
                      ]
                    },
                    {
                        'id': 'configuration',
                        'title': 'Configuration',
                        // 'transalate': 'SOFTWARE.MANAGE-SOFTWARE',
                        'type': 'item',
                        'icon': 'settings',
                        'url' :'/configurations',                        
                    },
                ]
            }
        ];
    }
}
