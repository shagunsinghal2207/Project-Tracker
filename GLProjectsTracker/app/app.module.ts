import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { HttpModule } from '@angular/http';
import { routing } from './app.routing';
import { HomeComponent } from './Home/home.component';
import { LoginComponent } from './Login/login.component';
import { HeaderComponent } from './Header/Header.component';
import { UserComponent } from './User/User.component';
import { ProjectComponent } from './Project/Project.component';
import { AccountService } from './Service/account.service';
import { UserService } from './Service/user.service';
import { ProjectService } from './Service/project.service';
import { StatusService } from './Service/status.service';
//import { AuthGuard } from './Service/auth-guard.service';
import { AuthGuard } from './Service/auth.guard';
import { AuthService } from './Service/auth.service';
import { HomeLayoutComponent } from './layouts/home-layout.component';
import { LoginLayoutComponent } from './layouts/login-layout.component';



@NgModule({
    imports: [BrowserModule, ReactiveFormsModule, HttpModule, routing, Ng2Bs3ModalModule, FormsModule],
    declarations: [AppComponent, HomeComponent, LoginComponent, HeaderComponent, UserComponent, ProjectComponent, HomeLayoutComponent, LoginLayoutComponent],
    providers: [{ provide: APP_BASE_HREF, useValue: '/' }, AccountService, UserService, ProjectService, StatusService, AuthGuard, AuthService],
    bootstrap: [AppComponent]
})
export class AppModule {

    //  this.routing.navigate(['/aaa']);
}
