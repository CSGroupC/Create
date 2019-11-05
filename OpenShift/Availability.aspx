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

        // TODO: Fill in data from back-end
        let workingHoursStart = PLACEHOLDER;

        let container = document.getElementById( "availability-calendar" );
        let calendar = new AvailabilityCalendar( "9:00", "17:00", 15 );
        calendar.appendTo( container );
    </script>
</asp:Content>

