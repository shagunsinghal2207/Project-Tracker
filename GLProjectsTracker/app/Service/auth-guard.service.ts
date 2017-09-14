import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';  
import { Http, Headers, RequestOptions, Response } from '@angular/http';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
    private loggedIn: Subject<boolean> = new Subject<boolean>();
    
   

    canActivate() {
        console.log('i am checking to see if you are logged in');
        return true;
    }

    canActivateChild() {
        console.log('checking child route access');
        return true;
    }

    isLoggedIn() {
        //this.loggedIn.asObservable();
    }

}
