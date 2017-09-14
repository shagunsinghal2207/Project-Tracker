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
    public class UserController : Controller
    {
        // GET: User
        public ActionResult Index()
        {
            return View();
        }
        [System.Web.Http.HttpPost]
        
        public JsonResult GetUser()
        {
            var sr = BusinessLogicLayer.BLL.AccountBLL.GetUser();
            return Json(sr, JsonRequestBehavior.AllowGet);
        }

        public JsonResult CreateUser([FromBody]User userObj)
        {
            var sr = BusinessLogicLayer.BLL.AccountBLL.CreateUser(userObj);
            return Json(sr, JsonRequestBehavior.AllowGet);
        }
        public JsonResult UpdateUser([FromBody]User userObj)
        {
            var sr = BusinessLogicLayer.BLL.AccountBLL.UpdateUser(userObj);
            return Json(sr, JsonRequestBehavior.AllowGet);
        }

        public JsonResult DeleteUser([FromBody]User userObj)
        {
            var sr = BusinessLogicLayer.BLL.AccountBLL.DeleteUser(userObj);
            return Json(sr, JsonRequestBehavior.AllowGet);
        }       
    }
}