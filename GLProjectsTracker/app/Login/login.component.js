"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="../model/work.ts" />
var core_1 = require("@angular/core");
var account_service_1 = require("../Service/account.service");
//import { AuthGuard } from '../Service/auth-guard.service';
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var enum_1 = require("../Shared/enum");
var global_1 = require("../Shared/global");
var LoginComponent = (function () {
    //loggedIn = false;
    function LoginComponent(fb, _accountService, _router) {
        this.fb = fb;
        this._accountService = _accountService;
        this._router = _router;
        this.indLoading = false;
        this.Email = '';
        this.password = '';
        this.programs = [];
        this.msg = "Welcome to login page";
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.workFrm = this.fb.group({
            UserId: [''],
            Name: ['', forms_1.Validators.required],
            Email: ['', forms_1.Validators.required],
            Password: ['', forms_1.Validators.required],
            Gender: ['', forms_1.Validators.required],
            CreatedBy: [''],
            RoleId: [''],
            IsActive: [''],
        });
    };
    LoginComponent.prototype.LoginUser = function () {
        var _this = this;
        console.log('username', this.Email);
        var usrObj = {};
        usrObj['Email'] = this.Email;
        usrObj['Password'] = this.password;
        this._accountService.login(global_1.Global.BASE_Login_ENDPOINT, usrObj).subscribe(function (data) {
            if (data.IsSuccessful) {
                _this._accountService.loggedIn.next(true);
                _this._router.navigate(['/home']);
            }
            else {
                //console.log("Is not logged in ",this.isLogedIn);
                alert("Error : Please check email and Password");
            }
        }, function (error) {
            alert('errorrrr');
        });
    };
    LoginComponent.prototype.addUser = function () {
        var _this = this;
        this.dbops = enum_1.DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Registration";
        this.modalBtnTitle = "Add";
        this.workFrm.reset();
        this.modal.open();
        this._accountService.GetRole(global_1.Global.BASE_Role_ENDPOINT).subscribe(function (data) {
            console.log(data);
            if (data.IsSuccessful) {
                _this.programs = data.Result;
                console.log("xyz", _this.programs[0]);
            }
        });
    };
    LoginComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        this.msg = "";
        switch (this.dbops) {
            case enum_1.DBOperation.create:
                this._accountService.Create(global_1.Global.BASE_Registration_ENDPOINT, formData._value).subscribe(function (data) {
                    if (data.IsSuccessful) {
                        alert("Data Successfully added");
                    }
                    else {
                        alert("Error : Please check email and Password");
                    }
                    _this.modal.dismiss();
                }, function (error) {
                    _this.msg = error;
                });
                break;
        }
    };
    LoginComponent.prototype.SetControlsState = function (isEnable) {
        isEnable ? this.workFrm.enable() : this.workFrm.disable();
    };
    __decorate([
        core_1.ViewChild('modal'),
        __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
    ], LoginComponent.prototype, "modal", void 0);
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: 'app/Login/Login.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, account_service_1.AccountService, router_1.Router])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map