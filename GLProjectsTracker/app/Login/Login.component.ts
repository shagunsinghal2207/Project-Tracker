/// <reference path="../model/work.ts" />
import { Component, OnInit, ViewChild } from '@angular/core';
import { AccountService } from '../Service/account.service';
//import { AuthGuard } from '../Service/auth-guard.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Routes, Router } from '@angular/router';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Observable } from 'rxjs/Rx';
import { IWork } from '../Model/Work';
import { DBOperation } from '../Shared/enum';
import { Global } from '../Shared/global';


@Component({
    selector: 'app-login',
    templateUrl: 'app/Login/Login.component.html'
})

export class LoginComponent implements OnInit {
   

    @ViewChild('modal') modal: ModalComponent;   
    users: IWork[];
    user: IWork;
    msg: string;
    indLoading: boolean = false;
    workFrm: FormGroup;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;

    Email: string = '';
    password: string = '';
    returnUrl: string;
    selectedObject : null;
    programs: any[]=[];
    plist: any;
    //loggedIn = false;
   
    constructor(private fb: FormBuilder, private _accountService: AccountService,  private _router: Router) {
        this.msg = "Welcome to login page"
    }
    

    ngOnInit(): void {
        this.workFrm = this.fb.group({
            UserId: [''],
            Name: ['', Validators.required],
            Email: ['', Validators.required],
            Password: ['', Validators.required],
            Gender: ['', Validators.required],
            CreatedBy: [''],
            RoleId: [''],
            IsActive: [''],



        }); 
        
    }
    
    LoginUser() {

        console.log('username', this.Email);
        let usrObj = {};
        usrObj['Email'] = this.Email;
        usrObj['Password'] = this.password;

        this._accountService.login(Global.BASE_Login_ENDPOINT, usrObj).subscribe(data => {
            if (data.IsSuccessful) {
                this._accountService.loggedIn.next(true);           
                this._router.navigate(['/home']);
            }
            else {
                //console.log("Is not logged in ",this.isLogedIn);
                alert("Error : Please check email and Password");
            }


        }, error => {
            alert('errorrrr');
        });
    }

    
    addUser() {
        this.dbops = DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Registration";
        this.modalBtnTitle = "Add";
        this.workFrm.reset();
        this.modal.open();
        this._accountService.GetRole(Global.BASE_Role_ENDPOINT).subscribe(data => {
            console.log(data);
            if (data.IsSuccessful) {
                this.programs = data.Result;
                console.log("xyz",this.programs[0]);
              
               
            }


        });

    }

    onSubmit(formData: any) {
        this.msg = "";

        switch (this.dbops) {
            case DBOperation.create:
                this._accountService.Create(Global.BASE_Registration_ENDPOINT , formData._value).subscribe(
                    data => {
                        if (data.IsSuccessful) {
                            alert("Data Successfully added");
                        }
                        else {

                            alert("Error : Please check email and Password");
                        }

                        this.modal.dismiss();
                    },
                    error => {
                        this.msg = error;
                    }
                );
                break;
            
            

        }
    }
    SetControlsState(isEnable: boolean) {
        isEnable ? this.workFrm.enable() : this.workFrm.disable();
    }
}