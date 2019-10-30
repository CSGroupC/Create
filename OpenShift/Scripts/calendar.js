
const MONTH_NAMES = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

export function createCalendar(id) {
    const calendar = document.getElementById(id);
    let date = null;
    let currentDate = new Date();
    let requestData = new URLSearchParams(location.search);

    if (requestData.has("m") && requestData.has("d") && requestData.has("y")) {
        date = new Date(requestData.get("y"), requestData.get("m") - 1, requestData.get("d"));
    } else {
        date = new Date();
        window.history.replaceState(null, null, `?m=${date.getMonth() + 1}&d=${date.getDate()}&y=${date.getFullYear()}`);
        requestData = new URLSearchParams(location.search);
    }

    let dateBuffer = new Date(date);
    dateBuffer.setDate(1);

    calendar.innerHTML += `
    <div class="calendar-header">
        <a href="?m=${date.getMonth()}&d=${date.getDate()}&y=${date.getFullYear()}" class="calendar-month-previous"><i class="fas fa-chevron-left"></i></a>
        <a href="?m=${date.getMonth() + 2}&d=${date.getDate()}&y=${date.getFullYear()}" class="calendar-month-next"><i class="fas fa-chevron-right"></i></a>
        <span class="month-title">${MONTH_NAMES[dateBuffer.getMonth()]} ${dateBuffer.getFullYear()}</span>
        <a href="?m=${currentDate.getMonth() + 1}&d=${currentDate.getDate()}&y=${currentDate.getFullYear()}" class="today-button">Today</a>
    </div>
    `;


    calendar.innerHTML += `
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

    let dayList = calendar.getElementsByClassName("month-day-list")[0];

    // For each weekday from the last Sunday before this month, to the 1st of this month
    while (dateBuffer.getDay() > 0) {
        dayList.innerHTML += `
        <div class="month-day-filler"></div>
        `;
        dateBuffer.setDate(dateBuffer.getDate() - 1);
    }

    // Reset the date buffer
    dateBuffer = new Date(date);
    dateBuffer.setDate(1);

    // For each day of this month
    do {
        let todayClass = "";
        if (dateBuffer.getMonth() == currentDate.getMonth() && dateBuffer.getDate() == currentDate.getDate() && dateBuffer.getFullYear() == currentDate.getFullYear()) {
            todayClass = "today-day-number";
        }
        dayList.innerHTML += `
        <div><span class="day-number ${todayClass}">${dateBuffer.getDate()}</span></div>
        `;
        dateBuffer.setDate(dateBuffer.getDate() + 1);
    } while (dateBuffer.getDate() > 1);


    dateBuffer.setDate(dateBuffer.getDate() - 1);

    // For each weekday from the last day of this month, to the next Saturday
    while (dateBuffer.getDay() < 6) {
        dayList.innerHTML += `
        <div class="month-day-filler"></div>
        `;
        dateBuffer.setDate(dateBuffer.getDate() + 1);
    }

    // Reset the date buffer
    dateBuffer = new Date(date);
}
