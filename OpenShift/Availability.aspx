<%@ Page Title="" Language="C#" MasterPageFile="~/Site.master" AutoEventWireup="true" CodeFile="Availability.aspx.cs" Inherits="Availability" %>


<asp:Content ID="Content2" ContentPlaceHolderID="PageStylesheets" Runat="Server">
    <link href="https://fonts.googleapis.com/css?family=Mukta&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="./Content/calendar.css" type="text/css" />
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="PageScripts" Runat="Server">
    <script src="https://kit.fontawesome.com/6564cfcf09.js" crossorigin="anonymous"></script>
</asp:Content>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" Runat="Server">
    <div id="availability-calendar" class="calendar"></div>
    <script type="module">
        import { createCalendar } from "./Scripts/calendar.js";
        createCalendar( "availability-calendar" );
    </script>
</asp:Content>

