
export const MONTH_NAMES = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

// Returns format HH:MM
export function formatTime(time) {
    let coefficient = 1000 * 60 * 1;
    let timeBuffer = new Date(Math.ceil(time.getTime() / coefficient) * coefficient);
    let hours = timeBuffer.getHours();

    if (time.getHours() == 23 && hours == 0)
        hours = 24;

    return hours + ":" + timeBuffer.getMinutes().toString().padStart(2, "0");
}

export function getDateFromQueryString() {
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

export function preventDefault(event) {
    event.preventDefault();
    event.stopPropagation();
}

export const Event = {

    areFalseClicksPrevented: false,
    pointerDownElement: null,

    // NOTE: Calling this function changes the way click events are fired. 
    // It will prevent any click events from firing unless the mousedown and mouseup
    // both directly targetted the same element.
    // This is useful for apps with "click and drag" behavior
    preventFalseClicks: function () {

        if (this.areFalseClicksPrevented == false) {
            this.areFalseClicksPrevented = true;

            document.body.addEventListener("mousedown", (event) => {
                this.pointerDownElement = event.target;
            }, true);

            document.body.addEventListener("click", (event) => {
                if (event.target != this.pointerDownElement) {
                    event.preventDefault();
                    event.stopPropagation();
                }

                this.pointerDownElement = null;
            }, true);
        }
    },

    // Wrapper function for mouse/touch events
    // NOTE: This function does not account for multi-touching
    PointerHandler: function (callback, doDefault = false) {
        return (event) => {

            // Reassign the event object to the appropriate event (either the touch or the original mouse event)
            if ("changedTouches" in event && event.changedTouches.length > 0) {
                event.clientX = event.changedTouches[0].clientX;
                event.clientY = event.changedTouches[0].clientY;
                event.pageX = event.changedTouches[0].pageX;
                event.pageY = event.changedTouches[0].pageY;
                event.screenX = event.changedTouches[0].screenX;
                event.screenY = event.changedTouches[0].screenY;

                if (doDefault == false) {
                    event.stopPropagation();
                    // Don't prevent default on mobile, to allow scrolling
                    //event.preventDefault();
                }
            } else {

                if (doDefault == false) {
                    event.stopPropagation();
                    event.preventDefault();
                }
            }

            callback(event);
        }
    }
};