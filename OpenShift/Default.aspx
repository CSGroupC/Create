<%@ Page Title="Home Page" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="_Default" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <h2>Hello World!</h2>
    <p>Welcome to Beginning ASP.Net 4.5 on <%:DateTime.Now.ToString()%></p>
   
</asp:Content>
