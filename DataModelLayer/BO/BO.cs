using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataModelLayer.BO
{
    class BO
    {
    }
    public class UserDetail
    {
        public int UserId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }

        public string Gender { get; set; }
        public bool IsDeleted { get; set;}
    }
    public class RoleDetail
    {
        public int RoleId { get; set; }
        public string Name { get; set; }
       
    }
    public class ProjectDetail
    {
        public int ProjectId { get; set; }
        public string ProjectUID { get; set; }
        public string Name { get; set; }
        public DateTime ProjectCreatedOn { get; set; }
        public string Status { get; set; }
        public int StatusId { get; set; }
        public int UserId { get; set; }
        public string UserName { get; set; }
        public DateTime StatusCreatedOn { get; set; }
        public bool IsDeleted { get; set; }

    }

    public class ProjectStatus
    {
        public int ProjectStatusId { get; set; }
        public int ProjectId { get; set; }
        public int UserId { get; set; }
        public int StatusId { get; set; }       
        public DateTime StatusCreatedOn { get; set; }
        

    }

    public class StatusDetails
    {
        
        public int StatusId { get; set; }
        public string Name { get; set; }
        public DateTime StatusCreatedOn { get; set; }


    }



}
