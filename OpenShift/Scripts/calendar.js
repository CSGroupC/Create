import { CustomElement } from "./utilities.js";

const MONTH_NAMES = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];


function getDateFromQueryString() {
    let requestData = new URLSearchParams(location.search);
    let date = null;

    if (requestData.has("m") && requestData.has("d") && requestData.has("y")) {
        date = new Date(requestData.get("y"), requestData.get("m") - 1, requestData.get("d"));
    } else {
        date = new Date();
        window.history.replaceState(null, null, `?m=${date.getMonth() + 1}&d=${date.getDate()}&y=${date.getFullYear()}`);
        requestData = new URLSearchParams(location.search);
    }

    return date;
}

function preventDefault(event) {
    event.preventDefault();
    event.stopPropagation();
}

// Returns format HH:MM
function formatTime(time) {
    let coefficient = 1000 * 60 * 1;
    let timeBuffer = new Date(Math.ceil(time.getTime() / coefficient) * coefficient);
    let hours = timeBuffer.getHours();

    if (time.getHours() == 23 && hours == 0)
        hours = 24;

    return hours + ":" + timeBuffer.getMinutes().toString().padStart(2, "0");
}

class TimePeriodResizal {
    // NOTE: This class assumes event is a mouse event targeting the handle elment inside a time period
    constructor(calendar, event = null) {
        this.calendar = calendar;
        if (event != null) {
            this.start(event);
        }
    }

    start(event) {
        preventDefault(event);

        this.element = event.currentTarget.parentElement;
        this.startX = event.clientX;
        if (event.currentTarget.classList.contains("left-handle")) {
            this.side = "Start";
        } else {
            this.side = "End";
        }

        this.startColumn = parseInt(this.element.style["gridColumn" + this.side]);
    }

    stop(event) {
        preventDefault(event);
        this.element = null;
    }

    resize(event) {
        preventDefault(event);

        let parentWidth = this.element.parentElement.clientWidth;
        let offset = event.clientX - this.startX;
        // parseInt to use addition rather than concatenation
        let start = parseInt(this.element.style["gridColumn" + this.side]);
        let rightColumn = parseInt(this.element.style.gridColumnEnd);
        let leftColumn = parseInt(this.element.style.gridColumnStart);

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

        let timeElement = this.element.parentElement.getElementsByClassName("time-" + this.side.toLowerCase())[0];
        timeElement.innerHTML = this.calendar.columnToTime(newStart - 1);

        this.element.style["gridColumn" + this.side] = newStart;
    }
}

class TimePeriodMovement {
    // NOTE: This class assumes the events are mouse events targeting a time period element

    constructor(calendar, event = null) {
        this.calendar = calendar;
        if (event != null) {
            this.start(event);
        }
    }

    start(event) {
        preventDefault(event);

        this.element = event.currentTarget;
        this.startX = event.clientX;

        this.startColumn = parseInt(this.element.style.gridColumnStart);
        this.endColumn = parseInt(this.element.style.gridColumnEnd);
    }

    stop(event) {
        preventDefault(event);
        this.element = null;
    }

    move(event) {
        preventDefault(event);

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

export class Calendar {

    // Strings in format "HH:MM"
    constructor(dayStartTime, dayEndTime, minutesPerColumn) {

        this.twentyFourHourMode = true;
        this.minutesPerColumn = minutesPerColumn;

        this.dayStartTime = new Date();
        this.dayEndTime = new Date();
        this.setDayStartTime(dayStartTime);
        this.setDayEndTime(dayEndTime);

        // See getters below
        // this.columnsPerDay
        // this.dayStartColumn
        // this.dayEndColumn

        this.element = document.createElement("div");
        this.date = getDateFromQueryString();
        this.dayElements = null;
        this.dayList = null;

        const currentDate = new Date();

        // Objects that represent an instance of resizing or movement
        this.timePeriodResizal = null;
        this.timePeriodMovement = null;

        this.element.classList.add("calendar");
        this.element.innerHTML += `
        <div class="calendar-header">
            <a href="?m=${this.date.getMonth()}&d=${this.date.getDate()}&y=${this.date.getFullYear()}" class="calendar-month-previous"><i class="fas fa-chevron-left"></i></a>
            <a href="?m=${this.date.getMonth() + 2}&d=${this.date.getDate()}&y=${this.date.getFullYear()}" class="calendar-month-next"><i class="fas fa-chevron-right"></i></a>
            <span class="month-title">${MONTH_NAMES[this.date.getMonth()]} ${this.date.getFullYear()}</span>
            <a href="?m=${currentDate.getMonth() + 1}&d=${currentDate.getDate()}&y=${currentDate.getFullYear()}" class="btn btn-primary">Today</a>
        </div>
        `;

        this.element.innerHTML += `
        <div class="day-list">
            <div class="weekday-headers">
                <div>S</div>
                <div>M</div>
                <div>T</div>
                <div>W</div>
                <div>T</div>
                <div>F</div>
                <div>S</div>
            </div>
            <div class="month-day-list">
            </div>
        </div>
        `;

        this.dayListElement = this.element.getElementsByClassName("month-day-list")[0];

        // Count weekdays from the last Sunday before this month, to the 1st of this month
        let dateBuffer = new Date(this.date);
        dateBuffer.setDate(1);
        let daysBeforeMonth = dateBuffer.getDay();

        // Count days of this month
        dateBuffer = new Date(this.date);
        dateBuffer.setMonth(dateBuffer.getMonth() + 1);
        dateBuffer.setDate(0);
        let daysInMonth = dateBuffer.getDate();

        // Count weekdays from the last day of this month, to the next Saturday
        dateBuffer = new Date(this.date);
        dateBuffer.setMonth(dateBuffer.getMonth() + 1);
        dateBuffer.setDate(0);
        let daysAfterMonth = 6 - dateBuffer.getDay();

        this.addMonthDays(daysBeforeMonth, "month-day-filler");
        this.addMonthDays(daysInMonth, "month-day");
        this.addMonthDays(daysAfterMonth, "month-day-filler");

        let today = daysBeforeMonth + currentDate.getDate();

        if (this.date.getMonth() == currentDate.getMonth() && this.date.getFullYear() == currentDate.getFullYear()) {
            let todayElement = this.dayListElement.querySelector(".month-day:nth-child(" + today + ") .day-number");
            todayElement.classList.add("bg-primary");
            todayElement.classList.add("text-light");
        }
    }

    get dayStartColumn() {
        return (this.dayStartTime.getHours() * 60 + this.dayStartTime.getMinutes()) / this.minutesPerColumn;
    }

    get dayEndColumn() {
        return (this.dayEndTime.getHours() * 60 + this.dayEndTime.getMinutes()) / this.minutesPerColumn;
    }

    get columnsPerDay() {
        let startMinutes = this.dayStartTime.getHours() * 60 + Math.round(this.dayStartTime.getMinutes() / 60) * 60;
        let endMinutes = this.dayEndTime.getHours() * 60 + Math.round(this.dayEndTime.getMinutes() / 60) * 60;
        return (endMinutes - startMinutes) / this.minutesPerColumn;
    }

    columnToTime(column) {
        let timeStart = new Date(this.dayStartTime.getTime());
        timeStart.setMinutes(timeStart.getMinutes() + (column * this.minutesPerColumn));
        let time = formatTime(timeStart);
        if (time == "0:00" && column > 1) {
            time = "24:00";
        }
        return time;
    }

    // Expected format: HH:MM
    setDayStartTime(time) {
        let hours = time.split(":")[0];
        let minutes = time.split(":")[1];
        this.dayStartTime.setHours(hours, minutes, 0, 0);
    }

    // Expected format: HH:MM
    setDayEndTime(time) {
        let hours = time.split(":")[0];
        let minutes = time.split(":")[1];

        if (hours == 24)
            this.dayEndTime.setHours(23, 59, 59, 999);
        else
            this.dayEndTime.setHours(hours, minutes, 0, 0);
    }

    addMonthDays(count, classes) {
        let html = "";

        for (let i = 1; i <= count; i++) {
            html += `
            <div class="${classes}">
                <div class="day-number-wrapper"><span class="day-number">${i}</span></div>
                <div class="time-period-section"></div>
            </div>
            `;
        }

        this.dayListElement.innerHTML += html;
    }

    appendTo(parent) {
        parent.appendChild(this.element);
    }
}

export class AvailabilityCalendar extends Calendar {
    constructor(dayStartTime = "9:00", dayEndTime = "17:00", minutesPerColumn = 15) {
        super(dayStartTime, dayEndTime, minutesPerColumn);

        let monthDayElements = this.element.getElementsByClassName("month-day");
        for (let element of monthDayElements) {

            element.onclick = (event) => {

                if (this.timePeriodResizal == null && this.timePeriodMovement == null) {

                    let dayNumberElement = element.getElementsByClassName("day-number")[0];

                    // NOTE: Must use inline CSS for the grid-column property in order for resizing to work
                    // NOTE: Must use appendChild instead of innerHTML in order for the time periods to retain their click handlers 
                    let timePeriodWrapper = new CustomElement(`
                    <div class="time-period-wrapper" style="grid-template-columns: repeat( ${this.columnsPerDay}, 1fr );">
                        <div class="time-period-heading">

                            <span class="time-period-copy">
                                <i class="far fa-clone"></i>
                            </span>

                            <span class="time-period-time">
                                <span class="time-start">${formatTime(this.dayStartTime)}</span> - <span class="time-end">${formatTime(this.dayEndTime)}</span>
                            </span>

                            <span class="time-period-delete">
                                <i class="fas fa-trash-alt"></i>
                            </span>

                        </div>
                        <div class="time-period bg-success text-light" style="grid-column: 1 / ${this.columnsPerDay + 1};">
                            <i class="fas fa-grip-lines-vertical left-handle"></i>
                            <i class="fas fa-grip-lines-vertical right-handle"></i>
                        </div>
                    </div>
                    ` );

                    element.querySelector(".time-period-section").prepend(timePeriodWrapper);

                    let left = timePeriodWrapper.querySelector(".left-handle");
                    let right = timePeriodWrapper.querySelector(".right-handle");
                    let timePeriod = timePeriodWrapper.getElementsByClassName("time-period")[0];
                    let copyButton = timePeriodWrapper.getElementsByClassName("time-period-copy")[0];
                    let deleteButton = timePeriodWrapper.getElementsByClassName("time-period-delete")[0];

                    timePeriodWrapper.onclick = (event) => {
                        preventDefault(event);

                        if (this.timePeriodResizal != null) {
                            this.timePeriodResizal.stop(event);
                            this.timePeriodResizal = null;
                        }
                        else if (this.timePeriodMovement != null) {
                            this.timePeriodMovement.stop(event);
                            this.timePeriodMovement = null;
                        }
                    };

                    timePeriod.onmousedown = (event) => {
                        this.timePeriodMovement = new TimePeriodMovement(this, event);
                    };

                    left.onmousedown = (event) => {
                        this.timePeriodResizal = new TimePeriodResizal(this, event);
                    };
                    right.onmousedown = (event) => {
                        this.timePeriodResizal = new TimePeriodResizal(this, event);
                    };

                    deleteButton.onclick = (event) => {
                        element.querySelector(".time-period-section").removeChild(timePeriodWrapper);
                    };
                }
            }
        }

        // Add this to the body in case the user's mouse leaves the calendar
        document.body.addEventListener("click", (event) => {

            if (this.timePeriodResizal != null) {
                this.timePeriodResizal.stop(event);
                this.timePeriodResizal = null;
            }
            if (this.timePeriodMovement != null) {
                this.timePeriodMovement.stop(event);
                this.timePeriodMovement = null;
            }

        });

        this.element.onmousemove = (event) => {

            if (this.timePeriodResizal != null) {
                this.timePeriodResizal.resize(event);
            }
            else if (this.timePeriodMovement != null) {
                this.timePeriodMovement.move(event);
            }
        };
    }
}

// ---------------------------------------------------------------------------------------------------------
// Static properties
// ---------------------------------------------------------------------------------------------------------


// ---------------------------------------------------------------------------------------------------------
// Globals
// ---------------------------------------------------------------------------------------------------------
