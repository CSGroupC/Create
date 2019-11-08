<%@ Page Title="" Language="C#" MasterPageFile="~/Site.master" AutoEventWireup="true" CodeFile="Availability.aspx.cs" Inherits="Availability" %>

<asp:Content ID="Content2" ContentPlaceHolderID="PageStylesheets" runat="Server">
    <link rel="stylesheet" href="./Content/calendar.css" type="text/css" />
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="PageScripts" runat="Server">
</asp:Content>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="Server">
    <div id="availability-calendar"></div>
    <script type="module">
        import { AvailabilityCalendar } from "./Scripts/calendar.js";

        const PLACEHOLDER = 0;

        // DATA (BACK->FRONT):
        // 1. The start of the current user's business' working hours
        let workingHoursStart = PLACEHOLDER;
        // 2. The end of the current user's business' working hours
        let workingHoursEnd = PLACEHOLDER;

        let container = document.getElementById( "availability-calendar" );
        let calendar = new AvailabilityCalendar( "15:00", "24:00", 15 );
        calendar.appendTo( container );
    </script>
</asp:Content>

