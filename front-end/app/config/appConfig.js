export const APP_URL = (process.env.NODE_ENV === "production") ? "" : "http://localhost:8080";

// notification
export const notification = (type, content, header) => {
  toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": true,
    "progressBar": false,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "250",
    "hideDuration": "500",
    "timeOut": "3000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }
  //success,infor , warning, error
  toastr[type](content,header);
}


//time and date format for moment display || consider for using two format . please sync it
export const  DATE_FORMAT = 'YYYY-MM-DD'
export const  TIME_FORMAT = 'HH:mm'
export const  DATE_TIME_FORMAT_DISPLAY = TIME_FORMAT+' '+DATE_FORMAT  //change it to display
export const  DATE_TIME_FORMAT = DATE_FORMAT+' '+TIME_FORMAT
// time and date format for datetimepicker juery
export const DATE_FORMAT_PICKER = 'Y-m-d'
export const TIME_FORMAT_PICKER = 'H:i'
