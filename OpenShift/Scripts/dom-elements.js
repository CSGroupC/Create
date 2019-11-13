import { MONTH_NAMES, formatTime, getDateFromQueryString, preventDefault, Event } from "./utilities.js";

class TimePeriodResizal {
    // NOTE: This class assumes event is a mouse event targeting the handle elment inside a time period
    constructor(calendar, timePeriod, event = null) {
        this.calendar = calendar;
        this.timePeriod = timePeriod;
        if (event != null) {
            this.start(event);
        }
    }

    start(event) {
        this.startX = event.clientX;
        if (event.target.classList.contains("left-handle")) {
            this.side = "Start";
        } else {
            this.side = "End";
        }

        this.startColumn = parseInt(this.timePeriod.style["gridColumn" + this.side]);
    }

    stop(event) {
        this.timePeriod = null;
    }

    resize(event) {

        let parentWidth = this.timePeriod.parentElement.clientWidth;
        let offset = event.clientX - this.startX;
        // parseInt to use addition rather than concatenation
        let start = parseInt(this.timePeriod.style["gridColumn" + this.side]);
        let rightColumn = parseInt(this.timePeriod.style.gridColumnEnd);
        let leftColumn = parseInt(this.timePeriod.style.gridColumnStart);

        let newStart = this.startColumn + parseInt((offset / parentWidth) * this.calendar.columnsPerDay);

        // The margin between the start and end times
        let margin = parseInt(0.12 * this.calendar.columnsPerDay);

        if (this.side == "Start") {
            if (newStart < 1) newStart = 1;
            else if (newStart >= rightColumn - margin) newStart = rightColumn - margin;
        } else {
            if (newStart <= leftColumn + margin) newStart = leftColumn + margin;
            else if (newStart > this.calendar.columnsPerDay + 1) newStart = this.calendar.columnsPerDay + 1;
        }

        this.setColumn(newStart);
    }

    // side: "Left" or "Right"
    setColumn(column, side = this.side) {
        let timeElement = this.timePeriod.parentElement.getElementsByClassName("time-" + side.toLowerCase())[0];
        timeElement.innerHTML = this.calendar.columnToTime(column - 1);

        this.timePeriod.style["gridColumn" + side] = column;
    }
}

class TimePeriodMovement {
    // NOTE: This class assumes the events are mouse events targeting a time period element

    constructor(calendar, timePeriod, event = null) {
        this.calendar = calendar;
        this.timePeriod = timePeriod;
        if (event != null) {
            this.start(event);
        }
    }

    start(event) {

        this.element = event.target;
        this.startX = event.clientX;

        this.startColumn = parseInt(this.element.style.gridColumnStart);
        this.endColumn = parseInt(this.element.style.gridColumnEnd);
    }

    stop(event) {
        this.element = null;
    }

    move(event) {

        let parentWidth = this.element.parentElement.clientWidth;
        let offset = event.clientX - this.startX;
        let start = this.element.style.gridColumnStart;
        let end = this.element.style.gridColumnEnd;
        let rightColumn = this.element.style.gridColumnEnd;
        let leftColumn = this.element.style.gridColumnStart;

        let newStart = this.startColumn + parseInt((offset / parentWidth) * this.calendar.columnsPerDay);
        let newEnd = this.endColumn + parseInt((offset / parentWidth) * this.calendar.columnsPerDay);

        let boundaryOffset = 0;
        if (newStart < 1) {
            boundaryOffset = newStart - 1;
            newStart = 1;
            newEnd -= boundaryOffset;
        } else if (newEnd > this.calendar.columnsPerDay + 1) {
            boundaryOffset = newEnd - this.calendar.columnsPerDay - 1;
            newEnd = this.calendar.columnsPerDay + 1;
            newStart -= boundaryOffset;
        }

        let timeElement = this.element.parentElement.getElementsByClassName("time-start")[0];
        timeElement.innerHTML = this.calendar.columnToTime(newStart - 1);

        timeElement = this.element.parentElement.getElementsByClassName("time-end")[0];
        timeElement.innerHTML = this.calendar.columnToTime(newEnd - 1);

        this.element.style.gridColumnStart = newStart;
        this.element.style.gridColumnEnd = newEnd;
    }
}


export function CustomElement(html) {
    let template = document.createElement("template");
    // Prevent returning a text node of whitespace as the result
    html = html.trim();
    template.innerHTML = html;
    return template.content.firstChild;
}

export function TimePeriodWrapper(calendar) {

    let startTime = formatTime(calendar.dayStartTime);
    let endTime = formatTime(calendar.dayEndTime);
    let columnStart = 1;
    let columnEnd = calendar.columnsPerDay + 1;

    // If there's a time period template
    if (calendar.timePeriodTemplate != null) {
        startTime = calendar.timePeriodTemplate.getElementsByClassName("time-start")[0].innerHTML;
        endTime = calendar.timePeriodTemplate.getElementsByClassName("time-end")[0].innerHTML;
        columnStart = calendar.timePeriodTemplate.getElementsByClassName("time-period")[0].style.gridColumnStart;
        columnEnd = calendar.timePeriodTemplate.getElementsByClassName("time-period")[0].style.gridColumnEnd;
    }

    // NOTE: Must use inline CSS for the grid-column property in order for resizing to work
    // NOTE: Must use appendChild instead of innerHTML in order for the time periods to retain their click handlers 
    let timePeriodWrapper = new CustomElement(`
    <div class="time-period-wrapper" style="grid-template-columns: repeat( ${calendar.columnsPerDay}, 1fr );">
        <div class="time-period-heading">

            <span class="time-period-copy">
                <i class="far fa-copy"></i>
            </span>

            <span class="time-period-time">
                <span class="time-start">${startTime}</span> - <span class="time-end">${endTime}</span>
            </span>

            <span class="time-period-delete">
                <i class="fas fa-trash-alt"></i>
            </span>

        </div>
        <div class="time-period bg-success text-light" style="grid-column: ${columnStart} / ${columnEnd};">
            <i class="fas fa-grip-lines-vertical left-handle"></i>
            <i class="fas fa-grip-lines-vertical right-handle"></i>
        </div>
    </div>
    `);

    let left = timePeriodWrapper.querySelector(".left-handle");
    let right = timePeriodWrapper.querySelector(".right-handle");
    let timePeriod = timePeriodWrapper.getElementsByClassName("time-period")[0];
    let copyButton = timePeriodWrapper.getElementsByClassName("time-period-copy")[0];
    let deleteButton = timePeriodWrapper.getElementsByClassName("time-period-delete")[0];

    let handler = new Event.PointerHandler((event) => {
        calendar.timePeriodMovement = new TimePeriodMovement(calendar, timePeriod, event);
    });

    timePeriod.ontouchstart = handler;
    timePeriod.onmousedown = handler;

    // To prevent adding a new time period when clicking this time period
    // NOTE: onclick will be simulated on mobile browsers
    timePeriod.onclick = (event) => {
        event.stopPropagation();
    }

    handler = new Event.PointerHandler((event) => {
        calendar.timePeriodResizal = new TimePeriodResizal(calendar, timePeriod, event);
    });

    left.ontouchstart = handler;
    left.onmousedown = handler;

    right.ontouchstart = handler;
    right.onmousedown = handler;

    handler = new Event.PointerHandler((event) => {
        let resizal = new TimePeriodResizal(calendar, calendar.timePeriodTemplate.getElementsByClassName("time-period")[0]);
        resizal.setColumn(timePeriod.style.gridColumnStart, "Start");
        resizal.setColumn(timePeriod.style.gridColumnEnd, "End");
    });

    // NOTE: onclick will be simulated on mobile browsers
    copyButton.onclick = handler;

    handler = new Event.PointerHandler((event) => {
        timePeriodWrapper.parentElement.removeChild(timePeriodWrapper);
    });

    // NOTE: onclick will be simulated on mobile browsers
    deleteButton.onclick = handler;

    return timePeriodWrapper;
}

