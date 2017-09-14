import { Component, Input } from '@angular/core';
import { AccountService } from './Service/account.service';
import { UserService } from './Service/user.service';
import { AuthGuard } from './Service/auth-guard.service';
import { RouterModule, Routes, Router } from '@angular/router';

@Component({
    selector: 'my-app',
    template: `
                    
                
                    <div>                                      
                    <div >

                        <router-outlet></router-outlet>
                    </div>
                 </div>
 `
})
export class AppComponent {
    //loggedIn: any;
    //constructor(private auth: AuthGuard, private router: Router) {
    //    this.loggedIn = this.auth.isLoggedIn();
    //    console.log(this.loggedIn);
    //}  <app-header *ngIf="isLoogedIn()" ></app-header> //<div class='container'>
    isLoogedIn() {
        return true
    }
    
    }
