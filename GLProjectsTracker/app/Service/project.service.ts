﻿import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable()
export class ProjectService {
    headers: Headers;
    options: RequestOptions;
    constructor(private _http: Http) {
        this.headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'q=0.8;application/json;q=0.9'
        });
        this.options = new RequestOptions({ headers: this.headers });
    }


    GetProject(url: string): Observable<any> {
        return this._http.get(url)
            .map((response: Response) => <any>response.json())
            // .do(data => console.log("All: " + JSON.stringify(data)))
            .catch(this.handleError);
    }

    CreateProject(url: string, model: any): Observable<any> {
        let body = JSON.stringify(model);
        return this._http.post(url, body, this.options)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }

    UpdateProject(url: string, id: number, model: any): Observable<any> {
        let body = JSON.stringify(model);
        return this._http.put(url + id, body, this.options)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }

    deleteProject(url: string, id: number, model: any): Observable<any> {       
        return this._http.delete(url + id, this.options)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        return Observable.throw(error.json().error || 'Server error');
    }

}