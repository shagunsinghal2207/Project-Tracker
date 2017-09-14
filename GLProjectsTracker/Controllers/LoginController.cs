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
    public class LoginController : Controller
    {
        // GET: Login
        public ActionResult Index()
        {
            return View();
        }
        [System.Web.Http.HttpPost]
        public JsonResult Login([FromBody]User userObj)
        {
            var sr = BusinessLogicLayer.BLL.AccountBLL.Login(userObj.Email,userObj.Password);
            return Json(sr, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Registration([FromBody]User userObj)
        {
            var sr = BusinessLogicLayer.BLL.AccountBLL.Registration(userObj);
            return Json(sr, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetRole()
        {
            var sr = BusinessLogicLayer.BLL.AccountBLL.GetRole();   
            return Json(sr, JsonRequestBehavior.AllowGet);
        }
    }
}