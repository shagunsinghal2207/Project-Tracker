using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(GLProjectsTracker.Startup))]
namespace GLProjectsTracker
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            //ConfigureAuth(app);
        }
    }
}
