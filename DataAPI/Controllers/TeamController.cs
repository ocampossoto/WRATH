using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DataAPI.OtherFeatures;
using DataAPI.Models;

namespace DataAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeamController : ControllerBase
    {
        private DBManagment Database = new DBManagment();

        [HttpPost]
        public ActionResult<Team> PostTeam([FromBody]Team newTeam)
        {
            return Database.CreateTeam(newTeam);
        }

        // GET: api/Team/5
        [HttpGet("{id}")]
        public ActionResult<Team> GetTeam(int id)
        {
            var team = Database.GetById(id);

            if (team == null)
            {
                return NotFound();
            }

            return team;
        }
    }
}