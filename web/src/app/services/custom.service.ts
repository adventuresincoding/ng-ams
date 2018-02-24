import { Http, Headers, Request, RequestOptions, Response, URLSearchParams, ResponseContentType } from '@angular/http';
import { HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { AuthenticationService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class CustomHttpService {
    apiUrl: string;
    /**
     *Custom Service for Http Calls 
     */
    constructor(private _http: Http, private _authService: AuthenticationService) {
        this.apiUrl = environment.apiUrl;
    }

    /**
     * Performs an get operation.
     * @param url 
     * @param id 
     */
    get(url: string, id?: any): Observable<any> {
        let options = this._authService.getOptions();
        return this._http.get(this.apiUrl + url + '/' + id, options).catch((exception) => {
            throw exception;
        })
    }

    /**
     * Gets user(Student or emp by name used for autocomplete)
     * @param url 
     * @param name 
     */
    getUserByName(url: string, name?: any): Observable<any> {
        let options = this._authService.getOptions();
        return this._http.get(this.apiUrl + url + name, options).catch((exception) => {
            throw exception;
        })
    }

    post(url: string, object: any): Observable<any> {
        let options = this._authService.getOptions();
        return this._http.post(this.apiUrl + url, object, options).catch((exception) => {
            throw exception;
        })
    }

    put(url: string, object: any): Observable<any> {
        let options = this._authService.getOptions();
        return this.put(this.apiUrl + url, object)
    }

    fileUpload(url: string, file: File, id: number, documentType: string, userType: string): Observable<any> {
        let currentUser = localStorage.getItem('currentUser');
        let user = JSON.parse(currentUser);

        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + user.token);
        // headers.append('Content-Type', 'multipart/form-data');
        //headers.append('Accept', 'application/json')
        let formData = new FormData();
        formData.append('image', file);
        formData.append('Id', id.toString());
        formData.append('DocumentType', documentType);
        formData.append('UserType', userType)

        let options = new RequestOptions({ headers: headers });

        return this._http.post(this.apiUrl + url, formData, options).map((response) => response.json()).catch((exception) => {
            throw exception;
        })

    }

    fileDownload(url: string, id: string) {
        let options = this._authService.getFileOptions();
        return this._http.get(this.apiUrl + url + '/' + id,options)
            .map((result) => {
                return new Blob([result.blob()], { type: 'application/jpg' })
            }).catch((exception) =>{
                return exception;
            })
    }

    /**
     * 
     * @param url : specifies the path to make an http call
     * Returns a list of Objects
     */
    getAll(url: string): Observable<any> {
        let options = this._authService.getOptions();
        return this._http.get(this.apiUrl + url, options).catch((exception) => {
            throw exception;
        });
    }

    getByParams(url:string,student:any) :Observable<any>{
        let httpParams = new HttpParams();
        httpParams.append('FirstName',student.FullName);
        httpParams.append('MiddleName',student.MiddleName);
        httpParams.append('LastName',student.LastName);
        httpParams.append('Gender',student.Gender);
        httpParams.append('Standard',student.Standard);
        return this._http.get(this.apiUrl + url,{params:student}).catch((exception:any) =>{
            throw exception;
        })
    }

    getOptionsForFileUpload() {

    }

    delete() {

    }
}
