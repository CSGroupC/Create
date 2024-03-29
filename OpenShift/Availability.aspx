﻿<%@ Page Title="" Language="C#" MasterPageFile="~/Site.master" AutoEventWireup="true" CodeFile="Availability.aspx.cs" Inherits="Availability" %>

<asp:Content ID="Content2" ContentPlaceHolderID="PageStylesheets" runat="Server">
    <link rel="stylesheet" href="./Content/calendar.css" type="text/css" />
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="PageScripts" runat="Server">
</asp:Content>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="Server">
    <h1 class="display-4 text-center p-4">Availability</h1>
    <div id="availability-calendar"></div>
    <script type="module">
        import { AvailabilityCalendar } from "./Scripts/calendar.js";

        const PLACEHOLDER = 0;

        // DATA (BACK->FRONT):
        // 1. The current user's ID
        let userId = PLACEHOLDER;
        // 2. The current user's access token
        let accessToken = PLACEHOLDER;
        // 3. An array/object/map of the current user's availabilities for this month (from the query string)
        //    This should include each availability's start datetime, and end datetime
        let availabilities = [
            {
                id: 1,
                associateId: 1,
                associateName: "Rikako Kakinuma",
                isManager: true,
                startTime: "2019-11-26 17:00:00",
                endTime: "2019-11-26 23:59:59"
            },
            {
                id: 2,
                associateId: 1,
                associateName: "Rikako Kakinuma",
                isManager: true,
                startTime: "2019-11-27 19:00:00",
                endTime: "2019-11-27 23:59:59"
            },
            {
                id: 3,
                associateId: 1,
                associateName: "Rikako Kakinuma",
                isManager: true,
                startTime: "2019-11-25 17:00:00",
                endTime: "2019-11-25 23:59:59"
            }
        ];

        // 4. The start of the current user's business' working hours
        let workingHoursStart = PLACEHOLDER;
        // 5. The end of the current user's business' working hours
        let workingHoursEnd = PLACEHOLDER;
        // 6. The weekdays that the current user's store is CLOSED
        let closedWeekdays = [ "Saturday", "Sunday"];
        

        let container = document.getElementById( "availability-calendar" );
        let calendar = new AvailabilityCalendar( availabilities, closedWeekdays, "17:00", "24:00", 15 );
        calendar.appendTo( container );
    </script>
</asp:Content>
