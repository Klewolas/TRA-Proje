using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using TRA_API.Data;
using TRA_API.Models;

namespace Repository
{
    public static class SeedData
    {
        public static void EnsurePopulated(IApplicationBuilder app)
        {

            var context = app.ApplicationServices.GetService<UserContext>();

            context.Database.Migrate();

            if (!context.User.Any())
            {
                var users = new[]
                {
                    new User() {UserName="Deneme" , Password = "aaaa"},
                };
                context.User.AddRange(users);
                context.SaveChanges();
            }

        }
    }
}