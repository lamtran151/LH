using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace LH.EntityFrameworkCore
{
    public static class LHDbContextConfigurer
    {
        public static void Configure(DbContextOptionsBuilder<LHDbContext> builder, string connectionString)
        {
            builder.UseSqlServer(connectionString);
        }

        public static void Configure(DbContextOptionsBuilder<LHDbContext> builder, DbConnection connection)
        {
            builder.UseSqlServer(connection);
        }
    }
}
