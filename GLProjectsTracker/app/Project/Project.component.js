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
var core_1 = require("@angular/core");
var project_service_1 = require("../Service/project.service");
var status_service_1 = require("../Service/status.service");
var user_service_1 = require("../Service/user.service");
var forms_1 = require("@angular/forms");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var enum_1 = require("../Shared/enum");
var global_1 = require("../Shared/global");
var router_1 = require("@angular/router");
var ProjectComponent = (function () {
    function ProjectComponent(fb, _userService, _projectService, _statusService, _router) {
        this.fb = fb;
        this._userService = _userService;
        this._projectService = _projectService;
        this._statusService = _statusService;
        this._router = _router;
        this.serviceurl = "http://localhost:54199/";
        this.indLoading = false;
    }
    ProjectComponent.prototype.ngOnInit = function () {
        this.projectFrm = this.fb.group({
            ProjectId: [''],
            Name: ['', forms_1.Validators.required],
            ProjectUID: ['', forms_1.Validators.required],
            ProjectCreatedOn: [''],
            Status: [''],
            StatusId: [''],
            UserId: [''],
            UserName: [''],
            StatusCreatedOn: [''],
            IsDeleted: ['']
        });
        this.LoadProject();
        this.LoadStatus();
        this.LoadUser();
    };
    ProjectComponent.prototype.LoadStatus = function () {
        var _this = this;
        this.indLoading = true;
        this._statusService.GetStatus(global_1.Global.BASE_GETSTATUS_ENDPOINT).subscribe(function (pstatus) {
            if (pstatus.IsSuccessful) {
                _this.pstatus = pstatus.Result;
                _this.indLoading = false;
            }
            else {
                alert("Error : Please check email and Password");
            }
        }, function (error) {
            alert('errorrrr');
        });
    };
    ProjectComponent.prototype.LoadUser = function () {
        var _this = this;
        this.indLoading = true;
        this._userService.GetUser(global_1.Global.BASE_GETUSER_ENDPOINT).subscribe(function (puser) {
            console.log(puser);
            if (puser.IsSuccessful) {
                _this.puser = puser.Result;
                _this.indLoading = false;
            }
            else {
                alert("Error : Please check email and Password");
            }
        }, function (error) {
            alert('errorrrr');
        });
    };
    ProjectComponent.prototype.LoadProject = function () {
        var _this = this;
        this.indLoading = true;
        this._projectService.GetProject(global_1.Global.BASE_GETPROJECT_ENDPOINT).subscribe(function (projects) {
            if (projects.IsSuccessful) {
                for (var i = 0; i < projects.Result.length; i++) {
                    var statuscreated = projects.Result[i].StatusCreatedOn;
                    var projectcreated = projects.Result[i].ProjectCreatedOn;
                    if (projectcreated.substring(0, 6) == "/Date(") {
                        var projectdate = new Date(parseInt(projectcreated.substring(6, projectcreated.length - 2)));
                        var projectdatestring = (projectdate.getMonth() + 1) + "/" + projectdate.getDate() + "/" + projectdate.getFullYear() + " " + projectdate.getHours() + ":" + projectdate.getMinutes() + ":" + projectdate.getSeconds();
                    }
                    if (statuscreated.substring(0, 6) == "/Date(") {
                        var statusdate = new Date(parseInt(statuscreated.substring(6, statuscreated.length - 2)));
                        var statusdatestring = (statusdate.getMonth() + 1) + "/" + statusdate.getDate() + "/" + statusdate.getFullYear() + " " + projectdate.getHours() + ":" + projectdate.getMinutes() + ":" + projectdate.getSeconds();
                    }
                    projects.Result[i].ProjectCreatedOn = projectdatestring;
                    projects.Result[i].StatusCreatedOn = statusdatestring;
                }
                _this.projects = projects.Result;
                _this.indLoading = false;
            }
            else {
                alert("Error : Please check email and Password");
            }
        }, function (error) {
            alert('errorrrr');
        });
    };
    ProjectComponent.prototype.addProject = function () {
        this.dbops = enum_1.DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New Project";
        this.modalBtnTitle = "Add";
        this.projectFrm.reset();
        this.modal.open();
    };
    ProjectComponent.prototype.editProject = function (ProjectId) {
        this.dbops = enum_1.DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit User";
        this.modalBtnTitle = "Update";
        this.project = this.projects.filter(function (x) { return x.ProjectId == ProjectId; })[0];
        this.projectFrm.setValue(this.project);
        this.modal.open();
    };
    ProjectComponent.prototype.deleteProject = function (ProjectId) {
        this.dbops = enum_1.DBOperation.delete;
        this.SetControlsState(false);
        this.modalTitle = "Confirm to Delete?";
        this.modalBtnTitle = "Delete";
        this.project = this.projects.filter(function (x) { return x.ProjectId == ProjectId; })[0];
        this.projectFrm.setValue(this.project);
        this.modal.open();
    };
    ProjectComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        this.msg = "";
        switch (this.dbops) {
            case enum_1.DBOperation.create:
                this._projectService.CreateProject(global_1.Global.BASE_CREATEPROJECT_ENDPOINT, formData._value).subscribe(function (data) {
                    if (data) {
                        _this.msg = "Data successfully added.";
                        _this.LoadProject();
                    }
                    else {
                        _this.msg = "There is some issue in saving records, please contact to system administrator!";
                    }
                    _this.modal.dismiss();
                }, function (error) {
                    _this.msg = error;
                });
                break;
            case enum_1.DBOperation.update:
                this._projectService.UpdateProject(global_1.Global.BASE_UPDATEPROJECT_ENDPOINT, formData._value.ProjectId, formData._value).subscribe(function (data) {
                    if (data) {
                        _this.msg = "Data successfully updated.";
                        _this.LoadProject();
                    }
                    else {
                        _this.msg = "There is some issue in saving records, please contact to system administrator!";
                    }
                    _this.modal.dismiss();
                }, function (error) {
                    _this.msg = error;
                });
                break;
            case enum_1.DBOperation.delete:
                this._projectService.UpdateProject(global_1.Global.BASE_DELETEPROJECT_ENDPOINT, formData._value.ProjectId, formData._value).subscribe(function (data) {
                    if (data) {
                        _this.msg = "Data successfully deleted.";
                        _this.LoadProject();
                    }
                    else {
                        _this.msg = "There is some issue in saving records, please contact to system administrator!";
                    }
                    _this.modal.dismiss();
                }, function (error) {
                    _this.msg = error;
                });
                break;
        }
    };
    ProjectComponent.prototype.SetControlsState = function (isEnable) {
        isEnable ? this.projectFrm.enable() : this.projectFrm.disable();
    };
    __decorate([
        core_1.ViewChild('modal'),
        __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
    ], ProjectComponent.prototype, "modal", void 0);
    ProjectComponent = __decorate([
        core_1.Component({
            selector: 'app-project',
            templateUrl: 'app/Project/Project.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, user_service_1.UserService, project_service_1.ProjectService, status_service_1.StatusService, router_1.Router])
    ], ProjectComponent);
    return ProjectComponent;
}());
exports.ProjectComponent = ProjectComponent;
//# sourceMappingURL=Project.component.js.map