using DataModelLayer.BO;
using DataModelLayer.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static DataModelLayer.BO.ServiceReturnType;


namespace DataAccessLayer.DAL
{
    public class AccountDAL
    {
        public static ServiceResult<UserDetail> Login(string email, string password)
        {
            UserDetail result = new UserDetail();
            try
            {
                
                using (var context = new GLProjectTrackerEntities())
                {
                    IQueryable<DataModelLayer.Model.User> userQuery = (from a in context.Users where a.Email == email && a.Password == password select a);
                    DataModelLayer.Model.User user = userQuery.FirstOrDefault();
                    if (user == null)
                    {
                        var sr = ServiceReturnType.FailureWithDataResult<UserDetail>(result);
                        sr.Message = "Email or Password is wrong.";
                        return sr;
                    }
                    else
                    {
                        if (!user.IsActive)
                        {
                            var sr = ServiceReturnType.FailureWithDataResult<UserDetail>(result);
                            sr.Message = "User is not active. Please contact to admin";
                            return sr;
                        }
                        else
                        {
                            result.Email = user.Email;
                            result.UserId = user.UserId;


                        }

                    }
                }

                return ServiceReturnType.SuccessWithDataResult<UserDetail>(result);
            }
            catch (Exception ex)
            {

                var sr = ServiceReturnType.FailureWithDataResult<UserDetail>(result);
                sr.Message = "There are some error.";
                return sr;
            }
        }
        public static ServiceResult<UserDetail> Registration(User userobj)
        {
            UserDetail result = new UserDetail();
            //User obj = new User();
            try
            {

                using (var context = new GLProjectTrackerEntities())
                {
                    userobj.CreatedOn = DateTime.Now;
                    userobj.IsActive = true;
                    context.Users.Add(userobj);
                    context.SaveChanges();
                    
                }

                return ServiceReturnType.SuccessWithDataResult<UserDetail>(result);
            }
            catch (Exception ex)
            {

                var sr = ServiceReturnType.FailureWithDataResult<UserDetail>(result);
                sr.Message = "There are some error.";
                return sr;
            }
        }
        public static ServiceResult<List<RoleDetail>> GetRole()
        {
           
            List<RoleDetail> resultList = new List<RoleDetail>();            
            try
            {

                using (var context = new GLProjectTrackerEntities())
                {
                    IQueryable<RoleDetail> roleQuery = (from a in context.Roles select new RoleDetail { RoleId=a.RoleId,Name=a.Name});
                    resultList = roleQuery.ToList();
                   

                }
               return ServiceReturnType.SuccessWithDataResult<List<RoleDetail>>(resultList);
                
            }
            catch (Exception ex)
            {

                var sr = ServiceReturnType.FailureWithDataResult<List<RoleDetail>>(resultList);
                sr.Message = "There are some error.";
                return sr;
            }
        }
        public static ServiceResult<List<UserDetail>> GetUser()
        {

            List<UserDetail> resultList = new List<UserDetail>();
            try
            {

                using (var context = new GLProjectTrackerEntities())
                {
                    IQueryable<UserDetail> userQuery = (from a in context.Users where a.IsDeleted == false select new UserDetail { UserId = a.UserId, Name = a.Name,Email=a.Email, Gender=a.Gender });
                    resultList = userQuery.ToList();


                }
                return ServiceReturnType.SuccessWithDataResult<List<UserDetail>>(resultList);

            }
            catch (Exception ex)
            {

                var sr = ServiceReturnType.FailureWithDataResult<List<UserDetail>>(resultList);
                sr.Message = "There are some error.";
                return sr;
            }
        }

        public static ServiceResult<UserDetail> CreateUser(User userobj)
        {
            UserDetail result = new UserDetail();
            //User obj = new User();
            try
            {

                using (var context = new GLProjectTrackerEntities())
                {
                    userobj.CreatedOn = DateTime.Now;
                    userobj.IsActive = true;
                    context.Users.Add(userobj);
                    context.SaveChanges();

                }

                return ServiceReturnType.SuccessWithDataResult<UserDetail>(result);
            }
            catch (Exception ex)
            {

                var sr = ServiceReturnType.FailureWithDataResult<UserDetail>(result);
                sr.Message = "There are some error.";
                return sr;
            }
        }

        public static ServiceResult<bool> UpdateUser(User userobj)
        {
            
            try
            {

                using (var context = new GLProjectTrackerEntities())
                {
                    //IQueryable<UserDetail> userQuery =  from c in context.Users
                    //                                    where c.UserId == userobj.UserId
                    //                                    select new UserDetail
                    //        {
                    //                                        UserId = c.UserId,
                    //                                        Name = c.Name,
                    //                                        Email = c.Email,
                    //                                        Gender = c.Gender
                    //                                    };
                    var Userresult = context.Users.SingleOrDefault(b => b.UserId == userobj.UserId);
                    Userresult.Name = userobj.Name;
                    Userresult.Gender = userobj.Gender;                  
                    context.SaveChanges();

                }

                return ServiceReturnType.SuccessBoolResult;
            }
            catch (Exception ex)
            {

                var sr = ServiceReturnType.FailureBoolResult;
                sr.Message = "There are some error.";
                return sr;
            }
        }

        public static ServiceResult<bool> DeleteUser(User userobj)
        {
            
            try
            {

                using (var context = new GLProjectTrackerEntities())
                {

                    var result1 = context.Users.SingleOrDefault(b => b.UserId == userobj.UserId);
                    result1.IsDeleted = true;                    
                    context.SaveChanges();

                }

                return ServiceReturnType.SuccessBoolResult;
            }
            catch (Exception ex)
            {

                var sr = ServiceReturnType.FailureBoolResult;
                sr.Message = "There are some error.";
                return sr;
            }
        }

        public static ServiceResult<List<ProjectDetail>> GetProject()
        {

            List<ProjectDetail> resultList = new List<ProjectDetail>();
            try
            {

                using (var context = new GLProjectTrackerEntities())
                {
                    
                    IQueryable<ProjectDetail> userQuery = (from a in context.Projects
                                                           where a.IsDeleted == false
                                                           join projectstatus in context.ProjectStatus on a.ProjectId equals projectstatus.ProjectId
                                                        join status in context.Status on projectstatus.StatusId equals status.StatusId
                                                        join users in context.Users on projectstatus.UserId equals users.UserId
                                                        select new ProjectDetail { ProjectId =a.ProjectId, ProjectUID = a.ProjectUID, Name = a.Name, ProjectCreatedOn = a.CreatedOn , Status =status.Name, StatusId = status.StatusId, UserId = users.UserId, UserName =users.Name, StatusCreatedOn = projectstatus.CreatedOn});
                    resultList = userQuery.ToList();


                }
                return ServiceReturnType.SuccessWithDataResult<List<ProjectDetail>>(resultList);

            }
            catch (Exception ex)
            {

                var sr = ServiceReturnType.FailureWithDataResult<List<ProjectDetail>>(resultList);
                sr.Message = "There are some error.";
                return sr;
            }
        }

        public static ServiceResult<ProjectDetail> CreateProject(Project projectobj)
        {
            ProjectDetail result = new ProjectDetail();
            ProjectStatus resultS = new ProjectStatus();
            ProjectStatu obj = new ProjectStatu();
            //User obj = new User();
            try
            {

                using (var context = new GLProjectTrackerEntities())
                {
                    obj.ProjectId = projectobj.ProjectId;
                    obj.UserId = 2;
                    obj.StatusId = 1;
                    obj.CreatedOn = DateTime.Now;
                    projectobj.CreatedOn = DateTime.Now;
                    projectobj.IsDeleted = false;
                    context.Projects.Add(projectobj);
                    context.ProjectStatus.Add(obj);
                    context.SaveChanges();

                }

                return ServiceReturnType.SuccessWithDataResult<ProjectDetail>(result);
            }
            catch (Exception ex)
            {

                var sr = ServiceReturnType.FailureWithDataResult<ProjectDetail>(result);
                sr.Message = "There are some error.";
                return sr;
            }
        }

        public static ServiceResult<bool> UpdateProject(Project projectobj, ProjectStatu prostatobj)
        {

            try
            {

                using (var context = new GLProjectTrackerEntities())
                {
                    //IQueryable<UserDetail> userQuery =  from c in context.Users
                    //                                    where c.UserId == userobj.UserId
                    //                                    select new UserDetail
                    //        {
                    //                                        UserId = c.UserId,
                    //                                        Name = c.Name,
                    //                                        Email = c.Email,
                    //                                        Gender = c.Gender
                    //                                    };
                    var projectresult = context.Projects.SingleOrDefault(b => b.ProjectId == projectobj.ProjectId);
                    projectresult.Name = projectobj.Name;
                    projectresult.ProjectUID = projectobj.ProjectUID;
                    projectresult.IsDeleted = false;
                    var projectstatusresult = context.ProjectStatus.SingleOrDefault(b => b.ProjectId == projectobj.ProjectId);
                    projectstatusresult.UserId = prostatobj.UserId;
                    projectstatusresult.StatusId = prostatobj.StatusId;
                    projectstatusresult.CreatedOn = DateTime.Now;
                    context.SaveChanges();

                }

                return ServiceReturnType.SuccessBoolResult;
            }
            catch (Exception ex)
            {

                var sr = ServiceReturnType.FailureBoolResult;
                sr.Message = "There are some error.";
                return sr;
            }
        }

        public static ServiceResult<bool> DeleteProject(Project projectobj)
        {

            try
            {

                using (var context = new GLProjectTrackerEntities())
                {

                    var projectresult1 = context.Projects.SingleOrDefault(b => b.ProjectId == projectobj.ProjectId);
                    projectresult1.IsDeleted = true;
                    context.SaveChanges();

                }

                return ServiceReturnType.SuccessBoolResult;
            }
            catch (Exception ex)
            {

                var sr = ServiceReturnType.FailureBoolResult;
                sr.Message = "There are some error.";
                return sr;
            }
        }

        public static ServiceResult<List<StatusDetails>> GetStatus()
        {

            List<StatusDetails> resultList = new List<StatusDetails>();
            try
            {

                using (var context = new GLProjectTrackerEntities())
                {
                    IQueryable<StatusDetails> userQuery = (from a in context.Status select new StatusDetails {StatusId  = a.StatusId, Name = a.Name});
                    resultList = userQuery.ToList();


                }
                return ServiceReturnType.SuccessWithDataResult<List<StatusDetails>>(resultList);

            }
            catch (Exception ex)
            {

                var sr = ServiceReturnType.FailureWithDataResult<List<StatusDetails>>(resultList);
                sr.Message = "There are some error.";
                return sr;
            }
        }

    }
}
