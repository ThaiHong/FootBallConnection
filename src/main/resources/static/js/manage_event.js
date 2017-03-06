/**
 * Created by ltphuc on 1/9/2017.
 */
var dateToday = new Date();

$('#datePickerScheduleStart').datetimepicker({
    timepicker:false,
    format:'d-m-Y',
    formatDate:'d/m/Y',
    minDate: dateToday
});

$('#timePickerScheduleStart').datetimepicker({
    datepicker: false,
    format: 'H:i',
    step: 15
});
$('#datePickerScheduleEnd').datetimepicker({
    timepicker:false,
    format:'d-m-Y',
    formatDate:'d/m/Y',
    minDate: dateToday
});

$('#timePickerScheduleEnd').datetimepicker({
    datepicker: false,
    format: 'H:i',
    step: 15
});

$("#selectSpeaker").select2({
    placeholder: "Speaker"
});