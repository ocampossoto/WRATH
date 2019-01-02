using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DataAPI.Models
{
    public class Team
    {
        public int Id { get; set; }
        public int Number { get; set; }
        public string Team_name  { get; set; }
        public bool Privacy { get; set; }
    }
}
