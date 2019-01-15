using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DataAPI.Models
{
    public class Scoutetemplate
    {
        public int Id { get; set; }
        public IDictionary<string, object> Templete { get; set; }
    }
}
