$(document).ready(function () {
    updateTimer();
});

function setTimerNumbers(days, hours, minutes, seconds) {
    $('.timer-days').text(days);
    $('.timer-hours').text(hours);
    $('.timer-mins').text(minutes);
    $('.timer-secs').text(seconds);
}

function getTimesLeft() {
    var now = new Date();
    var timesLeft = $('.datetimepicker-input')
        .map(function () {
            var left = moment($(this).val(), "HH:mm A") - now;
            if (left < 0) {
                left += 24 * 60 * 60 * 1000;
            }
            return left;
        }).filter(function () {
            return !isNaN(this)
        });
    if (timesLeft.length === 0) {
        return 0;
    } else {
        var minTime = Math.min.apply(Math, timesLeft);
        return isNaN(minTime) ? 0 : minTime;
    }
}

function updateTimer() {
// Update the count down every 1 second
    var timerId = setInterval(function () {

        // Find the distance between now and the count down date
        var distance = getTimesLeft();

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the element
        setTimerNumbers(days, hours, minutes, seconds);

        // If the count down is finished, write some text
        if (distance <= 0) {
            clearInterval(timerId);
            setTimerNumbers("00", "00", "00", "00");
        }
    }, 1000)
}
