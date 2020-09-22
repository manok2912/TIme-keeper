moment.tz.setDefault("Asia/Calcutta");
const slider = document.getElementById("timeRange");
const output = document.getElementById("demo");
const todayDT = document.getElementById("todayDT");
const usPdate = document.querySelector("#usPdate")
const usPtime = document.querySelector("#usPtime")
const usPdiff = document.querySelector("#usPdiff")
const usPzone = document.querySelector("#usPzone")
const usMdate = document.querySelector("#usMdate")
const usMtime = document.querySelector("#usMtime")
const usMdiff = document.querySelector("#usMdiff")
const usMzone = document.querySelector("#usMzone")
const usCdate = document.querySelector("#usCdate")
const usCtime = document.querySelector("#usCtime")
const usCdiff = document.querySelector("#usCdiff")
const usCzone = document.querySelector("#usCzone")
const usEdate = document.querySelector("#usEdate")
const usEtime = document.querySelector("#usEtime")
const usEdiff = document.querySelector("#usEdiff")
const usEzone = document.querySelector("#usEzone")
const usAdate = document.querySelector("#usAdate")
const usAtime = document.querySelector("#usAtime")
const usAdiff = document.querySelector("#usAdiff")
const usAzone = document.querySelector("#usAzone")
var timeFormat = 'HH:mm'
const todayCurrentDT = () => {
    todayDT.innerHTML = moment().format('dddd, MMMM DD YYYY, HH:mm:ss');
}
setInterval(todayCurrentDT, 1000);
const convertMinsToTime = (mins) => {
    let hrs = Math.floor(mins / 60);
    let min = mins % 60;
    hrs = hrs < 10 ? '0' + hrs : hrs;
    min = min < 10 ? '0' + min : min;
    return `${hrs}:${min}`;
}
const todayDate = () => {

    const d = new Date();
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    let date = d.getDate();
    month = month < 10 ? '0' + month : month;
    date = date < 10 ? '0' + date : date;
    return year + "-" + month + "-" + date

}
const getCurrentMins = () => {
    const d = new Date();
    return (d.getHours() * 60) + d.getMinutes()

}
const combineDateAndTime = (val) => {
    return todayDate() + " " + convertMinsToTime(val)
}
const getCurrentDT = () => {
    return todayDate() + " " + convertMinsToTime(getCurrentMins())
}
function convertMS(milliseconds) {
    var day, hour, minute, seconds;
    seconds = Math.floor(milliseconds / 1000);
    minute = Math.floor(seconds / 60);
    seconds = seconds % 60;
    hour = Math.floor(minute / 60);
    minute = minute % 60;
    day = Math.floor(hour / 24);
    hour = hour % 24;
    return hour + " hrs " + minute + " mins behind"
}
const getTimeDiff = (local, foreign) => {
    var duration = moment.duration(moment(local).diff(moment(foreign)));
    var hours = duration.asMilliseconds();
    return convertMS(hours)

}
function updatefirst() {
    let localcurrent = getCurrentDT();
    console.log(localcurrent);
    let pacific = timeZoneConverter(getCurrentDT(), "America/Los_Angeles")
    let mountain = timeZoneConverter(getCurrentDT(), "America/Denver")
    let central = timeZoneConverter(getCurrentDT(), "America/Chicago")
    let eastern = timeZoneConverter(getCurrentDT(), "America/New_York")
    let atlantic = timeZoneConverter(getCurrentDT(), "America/Halifax")
    usPdate.innerHTML = moment(pacific).format('dddd, DD MMMM YYYY')
    usPtime.innerHTML = moment(pacific).format(timeFormat)
    usPdiff.innerHTML = getTimeDiff(localcurrent, pacific)
    usMdate.innerHTML = moment(mountain).format('dddd, DD MMMM YYYY')
    usMtime.innerHTML = moment(mountain).format(timeFormat)
    usMdiff.innerHTML = getTimeDiff(localcurrent, mountain)
    usCdate.innerHTML = moment(central).format('dddd, DD MMMM YYYY')
    usCtime.innerHTML = moment(central).format(timeFormat)
    usCdiff.innerHTML = getTimeDiff(localcurrent, central)
    usEdate.innerHTML = moment(eastern).format('dddd, DD MMMM YYYY')
    usEtime.innerHTML = moment(eastern).format(timeFormat)
    usEdiff.innerHTML = getTimeDiff(localcurrent, eastern)
    usAdate.innerHTML = moment(atlantic).format('dddd, DD MMMM YYYY')
    usAtime.innerHTML = moment(atlantic).format(timeFormat)
    usAdiff.innerHTML = getTimeDiff(localcurrent, atlantic)
    console.log(getTimeDiff(localcurrent, pacific));
}
updatefirst();
const usPUpdate = (val) => {
    usPdate.innerHTML = moment(val).format('dddd, DD MMMM YYYY')
    usPtime.innerHTML = moment(val).format(timeFormat)
}
const usMUpdate = (val) => {
    usMdate.innerHTML = moment(val).format('dddd, DD MMMM YYYY')
    usMtime.innerHTML = moment(val).format(timeFormat)
}
const usCUpdate = (val) => {
    usCdate.innerHTML = moment(val).format('dddd, DD MMMM YYYY')
    usCtime.innerHTML = moment(val).format(timeFormat)
}
const usEUpdate = (val) => {
    usEdate.innerHTML = moment(val).format('dddd, DD MMMM YYYY')
    usEtime.innerHTML = moment(val).format(timeFormat)
}
const usAUpdate = (val) => {
    usAdate.innerHTML = moment(val).format('dddd, DD MMMM YYYY')
    usAtime.innerHTML = moment(val).format(timeFormat)
}
function timeZoneConverter(dateTime, timeZone) {
    return moment.tz(dateTime, "YYYY-MM-DD HH:mm", "Asia/Calcutta").tz(timeZone).format("YYYY-MM-DD HH:mm");
}
slider.value = getCurrentMins();
output.innerHTML = convertMinsToTime(slider.value);
slider.oninput = function () {
    var usPdt = timeZoneConverter(combineDateAndTime(this.value), "America/Los_Angeles");
    usPUpdate(usPdt);
    var usMdt = timeZoneConverter(combineDateAndTime(this.value), "America/Denver");
    usMUpdate(usMdt);
    var usCdt = timeZoneConverter(combineDateAndTime(this.value), "America/Chicago");
    usCUpdate(usCdt);
    var usEdt = timeZoneConverter(combineDateAndTime(this.value), "America/New_York");
    usEUpdate(usEdt);
    var usAdt = timeZoneConverter(combineDateAndTime(this.value), "America/New_York");
    usAUpdate(usAdt);
    output.innerHTML = convertMinsToTime(this.value);
}