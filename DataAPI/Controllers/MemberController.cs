using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DataAPI.Models;
using DataAPI.OtherFeatures;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace DataAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MemberController : ControllerBase
    {
        private DBManagment Database; 

        public MemberController(IConfiguration configuration)
        {
            Database = new DBManagment(configuration);
        }

        [HttpPost]
        public ActionResult<Member> PostMember([FromBody]Member newMember)
        {
            return Database.CreateUser(newMember);
        }

        [HttpGet("email={email}&password={password}")]
        //[Route("/email={email}&password={password}")]
        public ActionResult<Member> GetMember(string email, string password)
        {
            Member TMember = new Member();
            TMember.Email = email;
            TMember.Password = password;
            var member = Database.GetByEmail(TMember);

            if (member == null)
            {
                return NotFound();
            }

            return member;
        }
    }
}