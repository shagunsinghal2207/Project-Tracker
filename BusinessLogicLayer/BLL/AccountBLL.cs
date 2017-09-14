using DataModelLayer.BO;
using DataModelLayer.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static DataModelLayer.BO.ServiceReturnType;


namespace BusinessLogicLayer.BLL
{
    public class AccountBLL
    {
        public static ServiceResult<UserDetail> Login(string email, string pass)
        {
            return DataAccessLayer.DAL.AccountDAL.Login(email, pass);
        }
        public static ServiceResult<UserDetail> Registration(User userobj)
        {
            return DataAccessLayer.DAL.AccountDAL.Registration(userobj);
        }
        public static ServiceResult<List<RoleDetail>> GetRole()
        {
            return DataAccessLayer.DAL.AccountDAL.GetRole();
        }
        public static ServiceResult<List<UserDetail>> GetUser()
        {
            return DataAccessLayer.DAL.AccountDAL.GetUser();
        }
        public static ServiceResult<UserDetail> CreateUser(User userobj)
        {
            return DataAccessLayer.DAL.AccountDAL.CreateUser(userobj);
        }
        
        public static ServiceResult<bool> UpdateUser(User userobj)
        {
            return DataAccessLayer.DAL.AccountDAL.UpdateUser(userobj);
        }
        public static ServiceResult<bool> DeleteUser(User userobj)
        {
            return DataAccessLayer.DAL.AccountDAL.DeleteUser(userobj);
        }

        public static ServiceResult<List<ProjectDetail>> GetProject()
        {
            return DataAccessLayer.DAL.AccountDAL.GetProject();
        }
        public static ServiceResult<ProjectDetail> CreateProject(Project projectObj)
        {
            return DataAccessLayer.DAL.AccountDAL.CreateProject(projectObj);
        }
        public static ServiceResult<bool> UpdateProject(Project projectObj, ProjectStatu prostatobj)
        {
            return DataAccessLayer.DAL.AccountDAL.UpdateProject(projectObj, prostatobj);
        }

        public static ServiceResult<bool> DeleteProject(Project projectObj)
        {
            return DataAccessLayer.DAL.AccountDAL.DeleteProject(projectObj);
        }

        public static ServiceResult<List<StatusDetails>> GetStatus()
        {
            return DataAccessLayer.DAL.AccountDAL.GetStatus();
        }

    }
}
