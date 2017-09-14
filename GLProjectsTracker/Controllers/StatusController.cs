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
    public class StatusController : Controller
    {
        // GET: User
        public ActionResult Index()
        {
            return View();
        }
        [System.Web.Http.HttpPost]
        
        public JsonResult GetStatus()
        {
            var sr = BusinessLogicLayer.BLL.AccountBLL.GetStatus();
            return Json(sr, JsonRequestBehavior.AllowGet);
        }

        
    }
}