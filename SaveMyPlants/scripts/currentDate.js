var d = new Date();
var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

var day = d.getDate();

var month = new Array(12);
    month[1] = "January";
    month[2] = "February";
    month[3] = "March";
    month[4] = "April";
    month[5] = "May";
    month[6] = "June";
    month[7] = "July";
    month[8] = "August";
    month[9] = "Septemeber";
    month[10] = "October";
    month[11] = "November";
    month[12] = "December";

var year = d.getFullYear();

var n = weekday[d.getDay()] + "," + " " + day + " " + month[d.getMonth() + 1] + " " + year;
document.getElementById("currentdate").innerHTML = n;


