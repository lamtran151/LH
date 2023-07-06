using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using LH.Authorization.Roles;
using LH.Authorization.Users;
using LH.MultiTenancy;

namespace LH.EntityFrameworkCore
{
    public class LHDbContext : AbpZeroDbContext<Tenant, Role, User, LHDbContext>
    {
        /* Define a DbSet for each entity of the application */
        
        public LHDbContext(DbContextOptions<LHDbContext> options)
            : base(options)
        {
        }
    }
}
