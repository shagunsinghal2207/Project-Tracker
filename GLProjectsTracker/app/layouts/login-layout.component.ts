import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-login-layout',
    template: ` <div class ="row" >
                <img class="img-responsive" src="app/Images/project1.png" style="height:130px;width:100%" ></div>
                <div class="container body-content" style="margin-top:50px;">
                <router-outlet></router-outlet>
                </div>

  `,
    styles: []
})
export class LoginLayoutComponent { }
