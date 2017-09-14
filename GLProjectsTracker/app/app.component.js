"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var AppComponent = (function () {
    function AppComponent() {
    }
    //loggedIn: any;
    //constructor(private auth: AuthGuard, private router: Router) {
    //    this.loggedIn = this.auth.isLoggedIn();
    //    console.log(this.loggedIn);
    //}  <app-header *ngIf="isLoogedIn()" ></app-header> //<div class='container'>
    AppComponent.prototype.isLoogedIn = function () {
        return true;
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n                    \n                \n                    <div>                                      \n                    <div >\n\n                        <router-outlet></router-outlet>\n                    </div>\n                 </div>\n "
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map