using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DataModelLayer.Model;
using System.Data.Entity;
using System.Net.Http;
using System.Web.Http;
using System.Net;

namespace GLProjectsTracker.Controllers
{
    public class ProjectController : Controller
    {
        // GET: Project
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetProject()
        {
            var sr = BusinessLogicLayer.BLL.AccountBLL.GetProject();
            return Json(sr, JsonRequestBehavior.AllowGet);
        }

        public JsonResult CreateProject([FromBody]Project projectObj)
        {
            var sr = BusinessLogicLayer.BLL.AccountBLL.CreateProject(projectObj);
            return Json(sr, JsonRequestBehavior.AllowGet);
        }

        public JsonResult UpdateProject([FromBody]Project projectObj ,  [FromBody]ProjectStatu prostatobj)
        {
            var sr = BusinessLogicLayer.BLL.AccountBLL.UpdateProject(projectObj, prostatobj);
            return Json(sr, JsonRequestBehavior.AllowGet);
        }

        public JsonResult DeleteProject([FromBody]Project projectObj)
        {
            var sr = BusinessLogicLayer.BLL.AccountBLL.DeleteProject(projectObj);
            return Json(sr, JsonRequestBehavior.AllowGet);
        }
    }
}