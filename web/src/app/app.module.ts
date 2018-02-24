import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import 'hammerjs';
import { SharedModule } from './core/modules/shared.module';
import { AppComponent } from './app.component';
import { FuseMainModule } from './main/main.module';
import { FuseSplashScreenService } from './core/services/splash-screen.service';
import { FuseConfigService } from './core/services/config.service';
import { FuseNavigationService } from './core/components/navigation/navigation.service';
import { FuseSampleModule } from './main/content/sample/sample.module';
import { TranslateModule } from '@ngx-translate/core';
import { PagesModule } from './main/content/pages/pages.module';
import { HttpModule } from '@angular/http';
import { AuthGuard } from './services/auth.guard';
import { UserService } from './services/user.service';
import { AuthenticationService } from './../app/services/auth.service';
import { ProjectModule } from './main/content/dashboards/project/project.module';
import { AMSFakeDbService } from '../app/ams-fake-db/ams-fake-db.service';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { CustomHttpService } from './services/custom.service';

const appRoutes: Routes = [
    // {
    //     path      :'login',
    //     loadChildren:'./main/content/authentication/login/login.module#LoginModule'
    // },
    // {
    //     path      : '**',
    //     redirectTo: 'sample'
    // }
    // {
    //     path      : 'dashboards',
    //     loadChildren : './main/content/dashboards/project/project.module#ProjectModule'
    // },
    {
        path         :'devices',
        loadChildren : './main/content/apps/devices/devices.module#DevicesModule'
    },
    {
        path         :'software',
        loadChildren :'./main/content/apps/softwares/softwares.module#SoftwaresModule'
    },
    {
      path          : 'references',
      loadChildren  : './main/content/references/references.module#ReferencesModule'
    },
    {
      path          :'configurations',
      loadChildren  :'./main/content/apps/configurations/configurations.module#ConfigurationsModule'
    },
    {
        path        :'desk',
        loadChildren:'./main/content/apps/desks/desks.module#DesksModule'
    },
    {
        path        :'conference',
        loadChildren:'./main/content/apps/conferences/conferences.module#ConferencesModule'
    },
    {
        path        :'**',
        redirectTo  :'dashboards'
    }
    // {
    //     path      : '**',
    //     redirectTo: 'sample'
    // }
];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports     : [
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        //RouterModule.forRoot(appRoutes, { enableTracing: true }),
        RouterModule.forRoot(appRoutes),
        SharedModule,
        TranslateModule.forRoot(),
        FuseMainModule,
        FuseSampleModule,PagesModule,HttpModule ,
        ProjectModule,
        InMemoryWebApiModule.forRoot(AMSFakeDbService, {
            delay             : 0,
            passThruUnknownUrl: true
        }),
    ],
    providers   : [
        FuseSplashScreenService,
        FuseConfigService,
      FuseNavigationService, AuthGuard, UserService, AuthenticationService, CustomHttpService
    ],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}
