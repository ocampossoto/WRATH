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
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using System.Dynamic;

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
        ///convert datatype between db and user readable 
        ///mode = true : db=> read
        ///mode = false: read=>db
        private string ConvertType(string original, bool mode)
        {
            if (mode)
            {
                if (original == "int")
                {
                    return "int";
                }
                else if (original == "tinyint")
                {
                    return "bool";
                }
                else if(original == "varchar(255)")
                {
                    return "string";
                }
                else
                {
                    return "string";
                }
            }
            else
            {
                if (original == "int")
                {
                    return "int";
                }
                else if (original == "bool")
                {
                    return "tinyint";
                }
                else if (original == "string")
                {
                    return "varchar(255)";
                }
                else
                {
                    return "varchar(255)";
                }
            }
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

        public bool DeleteTable(int teamId, string tableName)
        {
            string deletTeamLinkeQuery = "DELETE FROM TEAM_TABLE_ID WHERE TEAMID = " + teamId + " AND TEAM_TABLE_NAME = '" + tableName + "';" + "DROP TABLE " + tableName + ";";
            SqlCommand command = new SqlCommand(deletTeamLinkeQuery, connection);

            int result = Run(connection, command).Result;
            if(result == 0)
            {
                connection.Close();
                return false;
            }
            else
            {
                connection.Close();
                return true;
            }
        }
        public string CreateTable(dynamic table)
        {
            string tableName = table.tblName;
            string teamNumber = table.teamid;
            string updatequery = "INSERT INTO TEAM_TABLE_ID (TEAMID, TEAM_TABLE_NAME) VALUES (" +
                teamNumber + ", '" + tableName + "');";

            SqlCommand command = new SqlCommand(updatequery, connection);

            int result = Run(connection, command).Result;
            if (result == 0)
            {
                return null;
            }
            connection.Close();

            string query = "CREATE TABLE " + tableName + "( ID int,";
            int cnt = 0;
            foreach (dynamic item in table)
            {
                if(cnt > 1)
                {
                    query += item.Value.name + " ";
                    string value = item.Value.type;
                    query += ConvertType(value, false) + ", ";
                    //if (item.Value.type == "int")
                    //{
                    //    query += "int,";
                    //}
                    //else if (item.Value.type == "string")
                    //{
                    //    query += "varchar(255),";
                    //}
                    //else if (item.Value.type == "bool")
                    //{
                    //    query += "tinyint,";
                    //}
                }
                cnt++;
            }
            query = query.Substring(0, query.Length - 1);
            query += " );";

            command = new SqlCommand(query, connection);

            result = Run(connection, command).Result;
            if (result == 0)
            {
                return null;
            }
            connection.Close();


            return table.name;
        }

        public List<string> getTableCol(int teamId, string tableName)
        {
            string query = "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = '" + tableName + "';";
            SqlCommand command = new SqlCommand(query, connection);

            int result = Run(connection, command).Result;

            SqlDataReader reader = command.ExecuteReader();
            List<string> col = new List<string>();
            int cnt = 0;
            while (reader.Read())
            {
                if (cnt > 0)
                {
                    col.Add(reader[0].ToString());
                }
                cnt++;
            }
            return col;
        }

        public dynamic getTableWithParams(int teamId, string tableName)
        {
           // dynamic data = new ExpandoObject();
            string query = "SELECT COLUMN_NAME,	DATA_TYPE FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = '" + tableName + "';";
            SqlCommand command = new SqlCommand(query, connection);

            int result = Run(connection, command).Result;

            SqlDataReader reader = command.ExecuteReader();
            Dictionary<string, string> col = new Dictionary<string, string>();
            while (reader.Read())
            {
                string colName = reader[0].ToString();
                string dataType = reader[1].ToString();
                col.Add(colName, ConvertType(dataType, true));
                
               // ((IDictionary<string, object>)data).Add(colName, dataType);

            }
            return col;
        }

        public List<string> getTables(int teamId)
        {
            string query = "SELECT TEAM_TABLE_NAME FROM TEAM_TABLE_ID WHERE TEAMID = " + teamId + ";";
            SqlCommand command = new SqlCommand(query, connection);

            int result = Run(connection, command).Result;

            SqlDataReader reader = command.ExecuteReader();
            List<string> col = new List<string>();
            while (reader.Read())
            {
                col.Add(reader[0].ToString());
            }
            return col;
        }
    }
}
