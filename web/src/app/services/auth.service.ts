import { Http, Headers, Request, Response, ResponseContentType, RequestOptions, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import { Router, } from '@angular/router'
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from './../shared/models/user/user.model';
import 'rxjs/add/operator/catch';
import { UserService } from './user.service';

@Injectable()
export class AuthenticationService {
    apiUrl: string;
    accessUrl: string;
    public headers: Headers;
    public options?: RequestOptions;
    public token?: string;
    public isAuthenticated: boolean;
    public tokenExpiredTime: string;
    public tokenExpiryDate: Date;
    // public userService = new UserService();
    /**
     *
     */
    constructor(private _http: Http, private router: Router) {
        this.apiUrl = environment.tokenUrl;
        this.accessUrl = environment.apiUrl;
    }

    /**
     * Get RequestOptions containing Token.
     */
    getOptions(): RequestOptions {
        let currentUser = localStorage.getItem('currentUser');
        let user = JSON.parse(currentUser);
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + user.token);
        let options = new RequestOptions({ headers: headers });
        options.withCredentials = true;
        return options;
    }

    /**
     * Gets option for file related http calls
     */
    getFileOptions(): RequestOptions {
        let currentUser = localStorage.getItem('currentUser');
        let user = JSON.parse(currentUser);
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + user.token);
        let options = new RequestOptions({ headers: headers, responseType: ResponseContentType.Blob });
        //let options = new RequestOptions({ headers: headers });
        options.withCredentials = true;
        return options;
    }

    /**
     * Gets options to sign in user. Used during logging.
     */
    getTokenOptions(): RequestOptions {
        let headers = new Headers();
        //headers.append("Authorization", "Basic cm9jbGllbnQ6bWFkZXVwc2VjcmV0");
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let options = new RequestOptions({ headers: headers });
        return options;
    }

    /**
     * Gets a new token by requesting the server sample
     */
    // getToken() {

    //     return this._http.post(this.apiUrl, "username=" + "admin" +
    //         "&password=" + "secret" +
    //         "&grant_type=password", this.getTokenOptions()).map((response: any) => {
    //             let token = response.json();
    //             console.log(token);
    //             console.log(token.access_token);
    //         }).catch((response) => {
    //             throw response;
    //         })
    // }

    /**
     * Gets token for already logged in user
     * Not in use currently
     */
    getUserToken(): any {
        let currentUser = localStorage.getItem('currentUser');
        let user = JSON.parse(currentUser);
        return user;
    }

    /**
     * 
     * @param model Logins a user by accepting user credentials and generating a token
     */
    login(model: any): Observable<any> {
        return this._http.post(this.apiUrl, "client_id=js" + "&client_secret=secret" + "&grant_type=password" + "&scope=" + "openid profile api1" + "&username=" + model.email + "&password=" + model.password, this.getTokenOptions())
            .map((response: any) => {
                let result = response.json();
                this.token = result.access_token;
                this.tokenExpiredTime = result.expires_in;
                this.isAuthenticated = true;
                let tokenDuration = new Date();
                tokenDuration.setSeconds(tokenDuration.getSeconds() + result.expires_in);
                localStorage.setItem('currentUser', JSON.stringify({ token: this.token, name: model.username, tokenExpiryDate: tokenDuration }));
                console.log(result);
                // this.getUserDetails();
                return result;
            }).catch((exception: any) => {
                return Observable.throw(exception);
            })
    }

    /**
     * Log out a user.
     */
    logOut() {
        localStorage.removeItem('currentUser');
        this.router.navigateByUrl('pages/auth/login');
    }

    forgotPassword() {

    }

    isUserLoggedIn(){
        
    }

    // getUser() {
    //     return this._http.get(this.accessUrl + 'User/GetUserDetails', this.getOptions()).subscribe((response) => {
    //         var result = response.json();            
    //         this.userService.setUser(result);
    //     });
    // }
}