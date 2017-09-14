import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AccountService {
    public loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    headers: Headers;
    options: RequestOptions;
    get isLoggedIn() {
        return this.loggedIn.asObservable();
    }
    constructor(private _http: Http) 
        {
            this.headers = new Headers({
                'Content-Type': 'application/json',
                'Accept': 'q=0.8;application/json;q=0.9'
            });
            this.options = new RequestOptions({ headers: this.headers });
        }    
      

    login(url: string, User: any): Observable<any> {
        console.log(User);
        let body = JSON.stringify(User);
        //console.log("xx", body);
        //let headers = new Headers({ 'Content-Type': 'application/json' });
        //let options = new RequestOptions({ headers: headers });
        return this._http.post(url, body, this.options)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }
    Create(url: string, model: any): Observable<any> {
        let body = JSON.stringify(model);       
        return this._http.post(url, body,this.options)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }
    GetRole(url: string): Observable<any> {
        return this._http.get(url)
            .map((response: Response) => <any>response.json())
             //.do(data => console.log("All: " + JSON.stringify(data)))
            .catch(this.handleError);
    }

    

    private handleError(error: Response) {
        return Observable.throw(error.json().error || 'Server error');
    }

}