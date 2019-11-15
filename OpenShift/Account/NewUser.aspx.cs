using Microsoft.AspNet.Identity;
using System;
using System.Linq;
using System.Web;
using System.Web.UI;
using WebSite1;
using System.Web.UI.WebControls;
using System.Data.SqlClient;
using System.Configuration;
using System.Data;

public partial class Account_Register : Page
{
    protected void CreateUser_Click(object sender, EventArgs e)
    {

        string _query = "INSERT INTO dbo.TAssociates (strFirstName,strLastName,strAddress,strPhoneNumber,dtmBirthdate,intStateID,strCity, strEmail, strZipCode,intStoreID, intEmployeeNumber,intAssociateTitleID, strPassword, blnIsManager, intStatusID,strPasswordResetToken, strAuthorizationToken, intCountryID) values (@first,@last, @address,@phone, @bday, @state, @city, @email, @zip, @location, @empNo, @title, @pass,@isManager, @status, @reset, @auth, @country)";
        using (SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString))
        {
            using (SqlCommand comm = new SqlCommand())
            {
                comm.Connection = conn;
                comm.CommandType = CommandType.Text;
                comm.CommandText = _query;
                comm.Parameters.AddWithValue("@first", FirstName.Text);
                comm.Parameters.AddWithValue("@last", LastName.Text);
                comm.Parameters.AddWithValue("@address", Address.Text);
                comm.Parameters.AddWithValue("@phone", PhoneNumber.Text);
                comm.Parameters.AddWithValue("@bday", Birthday.Text);
                comm.Parameters.AddWithValue("@state", State.Text);
                comm.Parameters.AddWithValue("@city", City.Text);
                comm.Parameters.AddWithValue("@email", EmailAddress.Text);
                comm.Parameters.AddWithValue("@zip", Zip.Text);
                comm.Parameters.AddWithValue("@location", Location.SelectedValue);
                comm.Parameters.AddWithValue("@empNo", EmployeeNumber.Text);
                comm.Parameters.AddWithValue("@title", AssociateTitle.SelectedValue);
                comm.Parameters.AddWithValue("@pass", Password.Text);
                comm.Parameters.AddWithValue("@isManager", 1);
                comm.Parameters.AddWithValue("@status", 1);
                comm.Parameters.AddWithValue("@reset", 1);
                comm.Parameters.AddWithValue("@auth", 1);
                comm.Parameters.AddWithValue("@country", 1);


                try
                {
                    conn.Open();
                    comm.ExecuteNonQuery();
                }
                catch (SqlException ex)
                {
                    throw new InvalidOperationException("Data could not be read", ex);
                }
            }
        }

    }

    protected void Clear_Click(object sender, EventArgs e)
    {

    }

    protected void Cancel_Click(object sender, EventArgs e)
    {

    }
}