import { InMemoryDbService } from 'angular-in-memory-web-api'
import { ProjectsDashboardDb } from './projects-dashboard';
import { LocationDb } from './look-up';

export class AMSFakeDbService implements InMemoryDbService{

    createDb(){
        return {
            // 'icons'                      : IconsFakeDb.icons,
            'projects-dashboard-projects': ProjectsDashboardDb.projects,
            'projects-dashboard-widgets' : ProjectsDashboardDb.widgets,
            'lookup-location'                   : LocationDb.Location
        }
    }
}