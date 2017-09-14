﻿import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { IUser } from '../Model/user';

@Injectable()
export class AuthService {
    private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    get isLoggedIn() {
        return this.loggedIn.asObservable();
    }

    constructor(
        private router: Router
    ) { }

    //login(user: IUser) {
    //    if (user.Email !== '' && user.Password != '') {
    //        this.loggedIn.next(true);
    //        this.router.navigate(['/']);
    //    }
    //}

    logout() {
        this.loggedIn.next(false);
        this.router.navigate(['/login']);
    }
}
