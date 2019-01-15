using DataAPI.Models;
using System;
using System.Configuration;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Protocols;
using Microsoft.Extensions.Configuration;

namespace DataAPI.OtherFeatures
{
    public class DBManagment
    {
        private readonly string connectionString;
        SqlConnection connection;

        public DBManagment(IConfiguration configuration)
        {
            
            connectionString = configuration["ConnectionString"];

            connection = new SqlConnection(connectionString);
        }
        public void Connect()
        {

        }
        static async Task<int> Run(SqlConnection conn, SqlCommand cmd)
        {
            await conn.OpenAsync();
            await cmd.ExecuteNonQueryAsync();
            return 1;
        }
        public Team GetById(int id)
        {
            Team temp = new Team();
            string QUERY = "SELECT * from TEAM WHERE NUMBER = " + id.ToString();
            SqlCommand command = new SqlCommand(QUERY, connection);

            int result = Run(connection, command).Result;

            SqlDataReader reader = command.ExecuteReader();
            while (reader.Read())
            {
                temp = new Team
                {
                    Id = reader.GetInt32(0),
                    Number = reader.GetInt32(1),
                    Team_name = reader[2].ToString(),
                    Privacy = Convert.ToBoolean(reader[3])
                };
                    
            }

            connection.Close();
            return temp;
        }
        
        public Team CreateTeam(Team team)
        {
            string QUERY = "INSERT INTO TEAM(NUMBER, TEAM_NAME, PRIVACY) VALUES(" + team.Number.ToString() + ",'" + team.Team_name.ToString() + "',"+ Convert.ToByte(team.Privacy).ToString()+");";
            SqlCommand command = new SqlCommand(QUERY, connection);

            int result = Run(connection, command).Result;
            if(result == 0)
            {
                return null;
            }
            connection.Close();
            return GetById(team.Number);
        }

        public Member CreateUser(Member newMember)
        {
            string encryedPassword = Encryption.Encrypt(newMember.Password);
            string QUERY = "INSERT INTO MEMBER (ACC_TYPE,F_NAME,L_NAME,EMAIL,PASS,TEAM_ID,APPROVED) VALUES (" + Convert.ToByte(newMember.AccType).ToString() + ",'" + newMember.F_Name + "','" + newMember.L_Name + "','" + newMember.Email + "','" + encryedPassword+ "'," + newMember.TeamId + "," + Convert.ToByte(newMember.Approved).ToString() + ");";
            SqlCommand command = new SqlCommand(QUERY, connection);

            int result = Run(connection, command).Result;
            if (result == 0)
            {
                return null;
            }
            connection.Close();
            return GetByEmail(newMember);
        }

        public Member GetByEmail(Member member)
        {
            string encryedPassword = Encryption.Encrypt(member.Password);
            Member temp = new Member();
            string QUERY = "SELECT * from MEMBER WHERE email = '" + member.Email+"';";
            SqlCommand command = new SqlCommand(QUERY, connection);

            int result = Run(connection, command).Result;

            SqlDataReader reader = command.ExecuteReader();
            while (reader.Read())
            {
                temp = new Member
                {
                    ID = reader.GetInt32(0),
                    AccType = Convert.ToBoolean(reader[1]),
                    F_Name = reader[2].ToString(),
                    L_Name = reader[3].ToString(),
                    Email = reader[4].ToString(),
                    Password = reader[5].ToString(),
                    TeamId = reader.GetInt32(6),
                    Approved = Convert.ToBoolean(reader[7])
                };

            }
            connection.Close();
            if(temp.ID != 0 && temp.Password == encryedPassword)
            {
                temp.Password = null;
                return temp;
            }
            else { return null; }
        }
    }
}
