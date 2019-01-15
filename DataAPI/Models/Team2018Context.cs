using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DataAPI.Models
{
    public class Team2018Context : DbContext
    {
        public Team2018Context(DbContextOptions<Team2018Context> options)
            : base(options)
        {
        }

        public DbSet<Team2018> Teams { get; set; }
    }
}
