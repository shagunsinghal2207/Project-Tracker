
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './Home/home.component'; //import home components
import { LoginComponent } from './Login/login.component'; //import Login component
import { HeaderComponent } from './Header/Header.component'; //import Header component
import { UserComponent } from './User/User.component'; //import User component
import { ProjectComponent } from './Project/Project.component'; //import User component
//import { AuthGuard } from './Service/auth-guard.service';
import { AuthGuard } from './Service/auth.guard';
import { LoginLayoutComponent } from './layouts/login-layout.component';
import { HomeLayoutComponent } from './layouts/home-layout.component';

//const appRoutes: Routes = [
//    { path: 'home', component: HomeComponent, canActivate: [AuthGuard]  },
//    { path: 'login', component: LoginComponent },
//    { path: 'user', component: UserComponent },  
//    { path: 'project', component: ProjectComponent }, 
//    { path: '', component: LoginComponent, pathMatch: 'full' } // redirect to home page on load
//];


const appRoutes: Routes = [
    
    {
        path: '',
        component: LoginLayoutComponent,        
        children: [
            {
                path: '',
                component: LoginComponent
            }
        ]
    },
    {
        path: '',       
        component: HomeLayoutComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'home',
                component: HomeComponent
            }
        ]
        
    },
    {
        path: '',
        component: HomeLayoutComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'user',
                component: UserComponent
            }
        ]

    },
    {
        path: '',
        component: HomeLayoutComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'project',
                component: ProjectComponent
            }
        ]

    },
    { path: '**', redirectTo: '' }
];




export const routing: ModuleWithProviders =
    RouterModule.forRoot(appRoutes);