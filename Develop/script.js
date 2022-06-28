var beginningHour = moment().startOf('day').add(7,'h');
var totalHours = 11;
var currentHour = moment().format('H');
var timeTableEl;
var currentState;

function todayDisplay() {
    var today = moment().format("dddd, MMMM Do, HH:mm A");
    
    $('#currentDay').text(today);
}

function fillTimeTable() {
    for (var hour = 0; hour < totalHours; hour++) {
        var realHour = hour + 8;
        timeTableEl = beginningHour.add(1,'h').format('HH:mm A');

        if (currentHour == realHour) {
            currentState = 'present';
        }
        else if (currentHour < realHour) {
            currentState = 'past';
        }
        else {
            currentState = 'future';
        }

        var blockAppend =
        `<div id="hour-${realHour}" class="row time-block ${currentState}">
            <div class="col-md-1 hour">${timeTableEl}</div>
            <textarea class="col-md-10 description ${realHour}"></textarea>
            <button class="saveBtn col-md-1">
                <i class="fas fa-save"></i>
            </button>

        </div>`;
        $(".container").append(blockAppend);
    }
    loadSchedule();
}

function saveSchedule() {
    var keyName = $(this).parent().attr('id');
    var keyValue = $(this).parent().children().eq(1).val();

    localStorage.setItem(keyName, keyValue);

}

function loadSchedule() {
    for (var hour = 0; hour < totalHours; hour++) {
        var realHour = hour + 8;
        var loadedSchedule = localStorage.getItem(`hour-${realHour}`);
        $(`.${realHour}`).val(loadedSchedule);
    }
}

todayDisplay();
fillTimeTable();
$('.saveBtn').on('click', saveSchedule);

setInterval(function() {
    todayDisplay();
}, 60000);

setInterval(function() {
    fillTimeTable();
}, 600000);