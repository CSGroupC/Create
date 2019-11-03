
const MONTH_NAMES = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

function getDateFromQueryString() {
    const requestData = new URLSearchParams(location.search);
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

export class Calendar {

    constructor() {
        
        this.element = document.createElement( "div" );
        this.date = getDateFromQueryString( );
        this.dayElements = null;
        this.dayList = null;
        
        const currentDate = new Date();

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

    addMonthDays(count, classes) {
        let html = "";
        
        for (let i = 1; i <= count; i++) {
            html += `
            <div class="${classes}"><span class="day-number">${i}</span></div>
            `;
        }

        this.dayListElement.innerHTML += html;
    }

    appendTo(parent) {
        parent.appendChild(this.element);
    }
}

export class AvailabilityCalendar extends Calendar {
    constructor() {
        super();

        /*
        this.element.innerHTML = `
        <h1>Availability</h1>
        ` + this.element.innerHTML;
        */

        let monthDayElements = this.element.getElementsByClassName("month-day");

        for (let element of monthDayElements) {
            element.onclick = () => {
                let dayNumberElement = element.getElementsByClassName("day-number")[0];

                // <i class="fas fa-times"></i>
                element.innerHTML += `
                <div class="time-period bg-success text-light">
                   <i class="fas fa-grip-lines-vertical" onclick="startDrag"></i>  9am-5pm <i class="fas fa-grip-lines-vertical" onclick="startDrag"></i>
                </div>
                `;
            }
        }
    }
}
