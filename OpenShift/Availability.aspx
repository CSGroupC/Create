<%@ Page Title="" Language="C#" MasterPageFile="~/Site.master" AutoEventWireup="true" CodeFile="Availability.aspx.cs" Inherits="Availability" %>

<asp:Content ID="Content2" ContentPlaceHolderID="PageStylesheets" Runat="Server">
    <link rel="stylesheet" href="./Content/calendar.css" type="text/css" />
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="PageScripts" Runat="Server">
</asp:Content>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" Runat="Server">
    <div id="availability-calendar" class="calendar"></div>
    <script type="module">
        import { AvailabilityCalendar } from "./Scripts/calendar.js";
        let calendar = new AvailabilityCalendar( "availability-calendar" );
    </script>

</asp:Content>

