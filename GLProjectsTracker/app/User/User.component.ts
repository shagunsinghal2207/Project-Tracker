import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../Service/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { IUser } from '../Model/user';
import { DBOperation } from '../Shared/enum';
import { Observable } from 'rxjs/Rx';
import { Global } from '../Shared/global';
import { RouterModule, Routes, Router } from '@angular/router';

@Component({
    selector: 'app-user',
    templateUrl: 'app/User/user.component.html'
   
})

export class UserComponent implements OnInit {

    serviceurl = "http://localhost:54199/";
    @ViewChild('modal') modal: ModalComponent;
    users: IUser[];
    user: IUser;
    msg: string;
    indLoading: boolean = false;
    userFrm: FormGroup;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;

    constructor(private fb: FormBuilder, private _userService: UserService, private _router: Router) {
    }

    ngOnInit(): void {
        this.userFrm = this.fb.group({
            UserId: [''],
            Name: ['', Validators.required],
            Email: [''],
            Gender: ['', Validators.required],
            IsDeleted: ['']
        });
        this.LoadUsers();
    }

    LoadUsers(): void { 
        this.indLoading = true;
        this._userService.GetUser(Global.BASE_GETUSER_ENDPOINT).subscribe(users => {
            if (users.IsSuccessful) {
                this.users = users.Result;
                this.indLoading = false;
            }
            else {

                alert("Error : Please check email and Password");
            }


        }, error => {
            alert('errorrrr');
        });

    }

    addUser() {
       this.dbops = DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New User";
        this.modalBtnTitle = "Add";
        this.userFrm.reset();
        this.modal.open();
    }

    editUser(UserId: number) {
        this.dbops = DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit User";
        this.modalBtnTitle = "Update";
        this.user = this.users.filter(x => x.UserId == UserId)[0];
        this.userFrm.setValue(this.user);
        this.modal.open();
    }

    deleteUser(UserId: number) {
        this.dbops = DBOperation.delete;
        this.SetControlsState(false);
        this.modalTitle = "Confirm to Delete?";
        this.modalBtnTitle = "Delete";
        this.user = this.users.filter(x => x.UserId == UserId)[0];
        this.userFrm.setValue(this.user);
        this.modal.open();
    }

    onSubmit(formData: any) {
        this.msg = "";

        switch (this.dbops) {
            case DBOperation.create:
                this._userService.CreateUser(Global.BASE_CREATEUSER_ENDPOINT, formData._value).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.msg = "Data successfully added.";
                            this.LoadUsers();
                        }
                        else {
                            this.msg = "There is some issue in saving records, please contact to system administrator!"
                        }

                        this.modal.dismiss();
                    },
                    error => {
                        this.msg = error;
                    }
                );
                break;
            case DBOperation.update:
                this._userService.UpdateUser(Global.BASE_UPDATEUSER_ENDPOINT, formData._value.UserId, formData._value).subscribe(
                    data => {
                        if (data) //Success
                        {
                            this.msg = "Data successfully updated.";
                            this.LoadUsers();
                        }
                        else {
                            this.msg = "There is some issue in saving records, please contact to system administrator!"
                        }

                        this.modal.dismiss();
                    },
                    error => {
                        this.msg = error;
                    }
                );
                break;
            case DBOperation.delete:
                this._userService.UpdateUser(Global.BASE_DELETEUSER_ENDPOINT, formData._value.UserId, formData._value).subscribe(
                    data => {
                        if (data) //Success
                        {
                            this.msg = "Data successfully deleted.";
                            this.LoadUsers();
                        }
                        else {
                            this.msg = "There is some issue in saving records, please contact to system administrator!"
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
        isEnable ? this.userFrm.enable() : this.userFrm.disable();
    }
}