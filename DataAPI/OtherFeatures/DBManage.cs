using DataAPI.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace DataAPI.OtherFeatures
{
    public class DBManage
    {
        private readonly string connectionString;
        SqlConnection connection;

        public DBManage()
        {
            connectionString =
                "Data Source = scout1847.database.windows.net;" +
                " Initial Catalog = scouting; User ID = ocampossoto;" +
                " Password = Bulldogs1; Connect Timeout = 30; Encrypt = True;" +
                " TrustServerCertificate = False; ApplicationIntent = ReadWrite;" +
                " MultiSubnetFailover = False;";
            connection = new SqlConnection(connectionString);
        }
        public void Connect()
        {

        }
        static async Task<int> Method(SqlConnection conn, SqlCommand cmd)
        {
            await conn.OpenAsync();
            await cmd.ExecuteNonQueryAsync();
            return 1;
        }
        
        public bool Removeteam(int id)
        {
            string queryString = "Delete from team2018 where Id = "+ id.ToString() + ";";
            using (connection)
            {
                SqlCommand command = new SqlCommand(queryString, connection);
                try
                {
                    connection.Open();
                    SqlDataReader reader = command.ExecuteReader();

                    reader.Close();
                    return true;
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                    return false;
                }
            }
        }
        public List<Team2018> Getteams()
        {
            List<Team2018> teamList = new List<Team2018>();
            string queryString = "select * from team2018;";
            using (connection)
            {
                SqlCommand command = new SqlCommand(queryString, connection);

                int result = Method(connection, command).Result;

                SqlDataReader reader = command.ExecuteReader();
                while (reader.Read())
                {
                    Team2018 temp = new Team2018
                    {
                        Id = reader.GetInt32(0),
                        TeamId = reader.GetInt32(1),
                        Name = reader[2].ToString(),
                        Scale = Convert.ToBoolean(reader[3]),
                        Switch = Convert.ToBoolean(reader[4]),
                        Exchange = Convert.ToBoolean(reader[5]),
                        Comments = reader[6].ToString()
                    };
                    teamList.Add(temp);
                }

                //using (connection)
                //{
                //    SqlCommand command = new SqlCommand(queryString, connection);
                //    try
                //    {
                //        connection.Open();
                //        SqlDataReader reader = command.ExecuteReader();

                //        while (reader.Read())
                //        {
                //            Team2018 temp = new Team2018
                //            {
                //                Id = reader.GetInt32(0),
                //                TeamId = reader.GetInt32(1),
                //                Name = reader[2].ToString(),
                //                Scale = Convert.ToBoolean(reader[3]),
                //                Switch = Convert.ToBoolean(reader[4]),
                //                Exchange = Convert.ToBoolean(reader[5]),
                //                Comments = reader[6].ToString()
                //            };
                //            teamList.Add(temp);

                //        }
                //        reader.Close();
                //    }
                //    catch (Exception ex)
                //    {
                //        Console.WriteLine(ex.Message);
                //    }
                return teamList;
            }
        }
    }
}
