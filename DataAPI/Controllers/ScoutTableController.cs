using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DataAPI.OtherFeatures;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

namespace DataAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ScoutTableController : ControllerBase
    {
        private DBManagment Database;

        public ScoutTableController(IConfiguration configuration)
        {
            Database = new DBManagment(configuration);
        }
        [HttpGet("{id}/{table}")]
        public ContentResult GetTable(int id, string table)
        {
            return Content(JsonConvert.SerializeObject(Database.getTableCol(id, table)), "application/json"); 
        }
        [HttpGet("{id}")]
        public ContentResult GetTableList(int id)
        {
            return Content(JsonConvert.SerializeObject(Database.getTables(id)), "application/json");
        }
        [HttpGet("params/{id}/{table}")]
        public ContentResult GetTableParams(int id, string table)
        {
            return Content(JsonConvert.SerializeObject(Database.getTableWithParams(id, table)), "application/json");
        }

        [HttpPost]
        public ActionResult PostTeam([FromBody]dynamic newTable)
        {

            Database.CreateTable(newTable);
            return Ok();
        }

        [HttpDelete("{id}/{table}")]
        public ActionResult DeleteTeamTable(int id, string table)
        {
            Database.DeleteTable(id, table);
            return Ok();
        }


    }
}