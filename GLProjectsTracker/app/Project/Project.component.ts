import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectService } from '../Service/project.service';
import { StatusService } from '../Service/status.service';
import { UserService } from '../Service/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { IProject } from '../Model/project';
import { IStatus } from '../Model/status';
import { IUser } from '../Model/user';
import { DBOperation } from '../Shared/enum';
import { Observable } from 'rxjs/Rx';
import { Global } from '../Shared/global';
import { RouterModule, Routes, Router } from '@angular/router';

@Component({
    selector: 'app-project',
    templateUrl: 'app/Project/Project.component.html'

})

export class ProjectComponent {
    serviceurl = "http://localhost:54199/";
    @ViewChild('modal') modal: ModalComponent;
    projects: IProject[];
    project: IProject;
    pstatus: IStatus[];
    puser: IUser[]; 
    msg: string;
    indLoading: boolean = false;
    projectFrm: FormGroup;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;

    constructor(private fb: FormBuilder, private _userService: UserService, private _projectService: ProjectService, private _statusService: StatusService, private _router: Router) {
    }

    ngOnInit(): void {
        this.projectFrm = this.fb.group({
            ProjectId: [''],
            Name: ['', Validators.required],
            ProjectUID: ['', Validators.required],
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
    }


    LoadStatus(): void {
        this.indLoading = true;
        this._statusService.GetStatus(Global.BASE_GETSTATUS_ENDPOINT).subscribe(pstatus => {
           
            if (pstatus.IsSuccessful) {
                this.pstatus = pstatus.Result;
                this.indLoading = false;
            }
            else {

                alert("Error : Please check email and Password");
            }


        }, error => {
            alert('errorrrr');
        });

    }

    LoadUser(): void {
        this.indLoading = true;
        this._userService.GetUser(Global.BASE_GETUSER_ENDPOINT).subscribe(puser => {
            console.log(puser);
            if (puser.IsSuccessful) {
                this.puser = puser.Result;
                this.indLoading = false;
            }
            else {

                alert("Error : Please check email and Password");
            }


        }, error => {
            alert('errorrrr');
        });

    }

    LoadProject(): void {
        this.indLoading = true;
        this._projectService.GetProject(Global.BASE_GETPROJECT_ENDPOINT).subscribe(projects => {
            
            if (projects.IsSuccessful) {
                for (var i = 0; i < projects.Result.length; i++) {
                    var statuscreated = projects.Result[i].StatusCreatedOn;
                    var projectcreated = projects.Result[i].ProjectCreatedOn;                   
                    if (projectcreated.substring(0, 6) == "/Date(") {
                        var projectdate = new Date(parseInt(projectcreated.substring(6, projectcreated.length - 2)));
                        var projectdatestring = (projectdate.getMonth() + 1) + "/" + projectdate.getDate() + "/" + projectdate.getFullYear() + " " + projectdate.getHours() + ":" + projectdate.getMinutes() + ":" + projectdate.getSeconds() ;
                    }
                    if (statuscreated.substring(0, 6) == "/Date(") {
                        var statusdate = new Date(parseInt(statuscreated.substring(6, statuscreated.length - 2)));
                        var statusdatestring = (statusdate.getMonth() + 1) + "/" + statusdate.getDate() + "/" + statusdate.getFullYear() + " " + projectdate.getHours() + ":" + projectdate.getMinutes() + ":" + projectdate.getSeconds() ;
                    }
                   
                   
                    projects.Result[i].ProjectCreatedOn = projectdatestring; 
                    projects.Result[i].StatusCreatedOn = statusdatestring; 

                }
                         
                this.projects = projects.Result;
                this.indLoading = false;
            }
            else {

                alert("Error : Please check email and Password");
            }


        }, error => {
            alert('errorrrr');
        });

    }

    addProject() {
        this.dbops = DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New Project";
        this.modalBtnTitle = "Add";
        this.projectFrm.reset();        
        this.modal.open();
    }

    editProject(ProjectId: number) {
        this.dbops = DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit User";
        this.modalBtnTitle = "Update";      

        this.project = this.projects.filter(x => x.ProjectId == ProjectId)[0];

        this.projectFrm.setValue(this.project);        
        this.modal.open();
    }

    deleteProject(ProjectId: number) {
        this.dbops = DBOperation.delete;
        this.SetControlsState(false);
        this.modalTitle = "Confirm to Delete?";
        this.modalBtnTitle = "Delete";
        this.project = this.projects.filter(x => x.ProjectId == ProjectId)[0];
        this.projectFrm.setValue(this.project);
        this.modal.open();
    }

    onSubmit(formData: any) {
        this.msg = "";

        switch (this.dbops) {
            case DBOperation.create:
                this._projectService.CreateProject(Global.BASE_CREATEPROJECT_ENDPOINT, formData._value).subscribe(
                    data => {
                        if (data) //Success
                        {
                            this.msg = "Data successfully added.";
                            this.LoadProject();
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
                this._projectService.UpdateProject(Global.BASE_UPDATEPROJECT_ENDPOINT, formData._value.ProjectId, formData._value).subscribe(
                    data => {
                        if (data) //Success
                        {
                            this.msg = "Data successfully updated.";
                            this.LoadProject();
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
                this._projectService.UpdateProject(Global.BASE_DELETEPROJECT_ENDPOINT, formData._value.ProjectId, formData._value).subscribe(
                    data => {
                        if (data) //Success
                        {
                            this.msg = "Data successfully deleted.";
                            this.LoadProject();
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
        isEnable ? this.projectFrm.enable() : this.projectFrm.disable();
    }
}