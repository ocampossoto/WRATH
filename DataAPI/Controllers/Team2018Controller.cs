﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DataAPI.Models;
using DataAPI.OtherFeatures;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DataAPI.Controllers
{
    [Route("api/2018")]
    public class Team2018Controller : Controller
    {
        private Team2018Context _context;
        private DBManage db;// = new DBManage();


        public Team2018Controller(Team2018Context context, IConfiguration configuration)
        {
            db = new DBManage(configuration);
            _context = context;

            if (_context.Teams.Count() == 0)
            {
                // Create a new TodoItem if collection is empty,
                // which means you can't delete all TodoItems.
                _context.Teams.Add(new Team2018{ TeamId = 1847, Scale = true, Switch = true, Exchange = true, Comments = "" });
                _context.SaveChanges();
            }
        }

        // GET: api/2018
        [HttpGet]
        public ActionResult<IEnumerable<Team2018>> GetTeams()
        {
            //return await _context.Teams.ToListAsync();
            return db.Getteams();
        }

        // GET: api/2018/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Team2018>> GetTeam(int id)
        {
            var team = await _context.Teams.FindAsync(id);

            if (team == null)
            {
                return NotFound();
            }

            return team;
        }

        //Post: api/2018
        [HttpPost]
        public async Task<ActionResult<Team2018>> PostTeam([FromBody]Team2018 newTeam)
        {
            _context.Teams.Add(newTeam);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTeam", new { id = newTeam.TeamId }, newTeam);
        }
    }
}
