"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var home_component_1 = require("./Home/home.component"); //import home components
var login_component_1 = require("./Login/login.component"); //import Login component
var User_component_1 = require("./User/User.component"); //import User component
var Project_component_1 = require("./Project/Project.component"); //import User component
//import { AuthGuard } from './Service/auth-guard.service';
var auth_guard_1 = require("./Service/auth.guard");
var login_layout_component_1 = require("./layouts/login-layout.component");
var home_layout_component_1 = require("./layouts/home-layout.component");
//const appRoutes: Routes = [
//    { path: 'home', component: HomeComponent, canActivate: [AuthGuard]  },
//    { path: 'login', component: LoginComponent },
//    { path: 'user', component: UserComponent },  
//    { path: 'project', component: ProjectComponent }, 
//    { path: '', component: LoginComponent, pathMatch: 'full' } // redirect to home page on load
//];
var appRoutes = [
    {
        path: '',
        component: login_layout_component_1.LoginLayoutComponent,
        children: [
            {
                path: '',
                component: login_component_1.LoginComponent
            }
        ]
    },
    {
        path: '',
        component: home_layout_component_1.HomeLayoutComponent,
        canActivate: [auth_guard_1.AuthGuard],
        children: [
            {
                path: 'home',
                component: home_component_1.HomeComponent
            }
        ]
    },
    {
        path: '',
        component: home_layout_component_1.HomeLayoutComponent,
        canActivate: [auth_guard_1.AuthGuard],
        children: [
            {
                path: 'user',
                component: User_component_1.UserComponent
            }
        ]
    },
    {
        path: '',
        component: home_layout_component_1.HomeLayoutComponent,
        canActivate: [auth_guard_1.AuthGuard],
        children: [
            {
                path: 'project',
                component: Project_component_1.ProjectComponent
            }
        ]
    },
    { path: '**', redirectTo: '' }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map