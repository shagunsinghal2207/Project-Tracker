import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from "@angular/core"
import { AuthService } from '../Service/auth.service';

//@Component({
//    template: `<img src="../../images/users.png" style="text-align:center"/>`
//})

@Component({
    selector: 'app-header',
    templateUrl: 'app/Header/Header.component.html'

})
export class HeaderComponent implements OnInit {    
    isLoggedIn$: Observable<boolean>;
    constructor(private authService: AuthService) { }

    ngOnInit() {
        this.isLoggedIn$ = this.authService.isLoggedIn;
    }

    onLogout() {
        this.authService.logout();
    }

}
