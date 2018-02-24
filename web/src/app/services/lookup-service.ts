import { Injectable } from '@angular/core';
import { RouterStateSnapshot, ActivatedRouteSnapshot, Resolve } from '@angular/router'
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { LookupModel } from '../shared/models/common/lookup.model';

@Injectable()
export class LookupService implements Resolve<any> {
    onGenderChange: BehaviorSubject<any> = new BehaviorSubject([]);
    lookupDataChange: BehaviorSubject<any> = new BehaviorSubject({})
    lookupData: LookupModel = new LookupModel();
    gender: any[];
    cityList: any[];
    stateList: any[];
    maritalStatusList: any[];
    locationList: any[];
    /**
     *
     */
    constructor(private _http: HttpClient) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> {

        return new Promise((resolve, reject) => {
            // this.getGender();
            // this.getCities();
            // this.getStates();
            // this.getMaritalStatusCode();
            this.getLocation();
            resolve();
        });
    }

    /**
     * Gets gender
     */
    getGender(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._http.get('api/lookup-gender').subscribe((response: any) => {
                this.gender = response;
                this.onGenderChange.next(this.gender);
                this.lookupData.gender = this.gender;
                this.lookupDataChange.next(this.lookupData);
                resolve(this.gender);
            }, reject);
        })
    }


    /**
     * Gets list of cities.
     */
    getCities(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._http.get('api/lookup-cities').subscribe((response: any) => {
                this.cityList = response;
                this.lookupData.cityList = response;
                this.lookupDataChange.next(this.lookupData);
                resolve(this.cityList)
            }, reject);
        })
    }

    /**
     * Get list of states
     */
    getStates(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._http.get('api/lookup-states').subscribe((response: any) => {
                this.stateList = response;
                this.lookupData.stateList = response;
                this.lookupDataChange.next(this.lookupData);
                resolve(this.stateList);
            }, reject)
        })
    }

    getMaritalStatusCode(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._http.get('api/lookup-marital-status-list').subscribe((response: any) => {
                this.maritalStatusList = response;
                this.lookupData.maritalStatusList = this.maritalStatusList;
                this.lookupDataChange.next(this.lookupData);
                resolve(this.maritalStatusList);
            }, reject)

        })
    }


    getLocation(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._http.get('api/lookup-location').subscribe((response: any) => {
                this.locationList = response;
                this.lookupData.locationList = this.locationList;
                this.lookupDataChange.next(this.lookupData);
                resolve(this.locationList);
            }, reject)
        })
    }
}
