"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var LoginLayoutComponent = (function () {
    function LoginLayoutComponent() {
    }
    LoginLayoutComponent = __decorate([
        core_1.Component({
            selector: 'app-login-layout',
            template: " <div class =\"row\" >\n                <img class=\"img-responsive\" src=\"app/Images/project1.png\" style=\"height:130px;width:100%\" ></div>\n                <div class=\"container body-content\" style=\"margin-top:50px;\">\n                <router-outlet></router-outlet>\n                </div>\n\n  ",
            styles: []
        })
    ], LoginLayoutComponent);
    return LoginLayoutComponent;
}());
exports.LoginLayoutComponent = LoginLayoutComponent;
//# sourceMappingURL=login-layout.component.js.map