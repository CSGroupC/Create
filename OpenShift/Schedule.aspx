﻿<%@ Page Title="" Language="C#" MasterPageFile="~/Site.master" AutoEventWireup="true" CodeFile="Schedule.aspx.cs" Inherits="Schedule" %>

<asp:Content ID="Content2" ContentPlaceHolderID="PageStylesheets" runat="Server">
    <link rel="stylesheet" href="./Content/calendar.css" type="text/css" />
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="PageScripts" runat="Server">
</asp:Content>

<asp:Content ID="Content4" ContentPlaceHolderID="MainContent" runat="Server">
    <h1 class="display-4 text-center p-4">Schedule</h1>
    <div id="scheduling-calendar"></div>
    <script type="module">
        import { SchedulingCalendar } from "./Scripts/calendar.js";

        const PLACEHOLDER = 0;

        // DATA (BACK->FRONT):
        // 1. The current user's store's associates' availabilities for this month (from the query string)
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
            },
            {
                id: 4,
                associateId: 2,
                associateName: "伊藤 朝陽",
                isManager: false,
                startTime: "2019-11-27 17:00:00",
                endTime: "2019-11-27 23:59:59"
            },
            {
                id: 5,
                associateId: 2,
                associateName: "伊藤 朝陽",
                isManager: false,
                startTime: "2019-11-26 17:00:00",
                endTime: "2019-11-26 23:59:59"
            },
            {
                id: 6,
                associateId: 2,
                associateName: "伊藤 朝陽",
                isManager: false,
                startTime: "2019-11-25 20:00:00",
                endTime: "2019-11-25 23:59:59"
            },
            {
                id: 7,
                associateId: 2,
                associateName: "伊藤 朝陽",
                isManager: false,
                startTime: "2019-11-28 17:00:00",
                endTime: "2019-11-28 23:59:59"
            },
            {
                id: 8,
                associateId: 2,
                associateName: "伊藤 朝陽",
                isManager: false,
                startTime: "2019-11-29 20:00:00",
                endTime: "2019-11-29 23:59:59"
            }
        ];
        
        // 2. The weekdays that the current user's store is CLOSED
        let closedWeekdays = [ "Saturday", "Sunday"];

        // 3. The current user's store's schedule for this month (from the query string)
        let shifts = [
             {
                id: 1,
                availabilityId: 1,
                associateId: 1,
                associateName: "Rikako Kakinuma",
                isManager: true,
                startTime: "2019-11-26 17:00:00",
                endTime: "2019-11-26 23:59:59"
            },
            {
                id: 2,
                availabilityId: 3,
                associateId: 1,
                associateName: "Rikako Kakinuma",
                isManager: true,
                startTime: "2019-11-25 17:00:00",
                endTime: "2019-11-25 23:59:59"
            },
            {
                id: 3,
                availabilityId: 5,
                associateId: 2,
                associateName: "伊藤 朝陽",
                isManager: false,
                startTime: "2019-11-26 17:00:00",
                endTime: "2019-11-26 23:59:59"
            }
        ];

        // 4. The minimum number of associates required to be scheduled every day
        let associateMinimum = 2;

        // 5. The minimum number of managers required to be scheduled every day
        let managerMinimum = 1;

        let container = document.getElementById( "scheduling-calendar" );
        let calendar = new SchedulingCalendar( associateMinimum, managerMinimum, shifts, availabilities, closedWeekdays, "17:00", "24:00", 15 );
        calendar.appendTo( container );
    </script>
</asp:Content>
