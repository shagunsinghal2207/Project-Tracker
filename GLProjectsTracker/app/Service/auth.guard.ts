import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AccountService } from '../Service/account.service';
import { AuthService } from '../Service/auth.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private auth: AccountService, private authService: AuthService, private router: Router) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> {
        console.log('xyz');
        return this.auth.isLoggedIn           
            .map((isLoggedIn: boolean) => {
                if (!isLoggedIn) {
                    this.router.navigate(['/login']);
                    return false;
                }
                return true;
            });
    }
}