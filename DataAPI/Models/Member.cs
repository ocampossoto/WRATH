using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DataAPI.Models
{
    public class Member
    {
        public int ID { get; set; }
        public bool AccType { get; set; }
        public string F_Name { get; set; }
        public string L_Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public int TeamId { get; set; }
        public bool Approved { get; set; }

    }
}
