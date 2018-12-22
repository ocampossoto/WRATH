using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DataAPI.Models
{
    public class Team2018
    {
        [Key]
        public int Id { get; set; }
        public int TeamId { get; set; }
        public bool Switch { get; set; }
        public bool Scale { get; set; }
        public bool Exchange { get; set; }
        public string Comments { get; set; }
    }
}
