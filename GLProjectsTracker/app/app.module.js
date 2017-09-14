"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var forms_2 = require("@angular/forms");
var app_component_1 = require("./app.component");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var http_1 = require("@angular/http");
var app_routing_1 = require("./app.routing");
var home_component_1 = require("./Home/home.component");
var login_component_1 = require("./Login/login.component");
var Header_component_1 = require("./Header/Header.component");
var User_component_1 = require("./User/User.component");
var Project_component_1 = require("./Project/Project.component");
var account_service_1 = require("./Service/account.service");
var user_service_1 = require("./Service/user.service");
var project_service_1 = require("./Service/project.service");
var status_service_1 = require("./Service/status.service");
//import { AuthGuard } from './Service/auth-guard.service';
var auth_guard_1 = require("./Service/auth.guard");
var auth_service_1 = require("./Service/auth.service");
var home_layout_component_1 = require("./layouts/home-layout.component");
var login_layout_component_1 = require("./layouts/login-layout.component");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, forms_1.ReactiveFormsModule, http_1.HttpModule, app_routing_1.routing, ng2_bs3_modal_1.Ng2Bs3ModalModule, forms_2.FormsModule],
            declarations: [app_component_1.AppComponent, home_component_1.HomeComponent, login_component_1.LoginComponent, Header_component_1.HeaderComponent, User_component_1.UserComponent, Project_component_1.ProjectComponent, home_layout_component_1.HomeLayoutComponent, login_layout_component_1.LoginLayoutComponent],
            providers: [{ provide: common_1.APP_BASE_HREF, useValue: '/' }, account_service_1.AccountService, user_service_1.UserService, project_service_1.ProjectService, status_service_1.StatusService, auth_guard_1.AuthGuard, auth_service_1.AuthService],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map