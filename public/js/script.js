/**
 * This is the JavaScript file that powers most of the page's
 * dynamic content (e.g. time, date, etc.).
 */

"use strict";

var bg = [
  "cats.jpg",
  "space.jpg",
  "mountains.jpg",
  "books.jpg",
  "plants.jpg"
];

function randomBackground() {
  let random = bg[Math.floor(Math.random()*bg.length)];
  let image = '../images/' + random
  document.body.background = image;
}

async function changeWeather() {
  let previousLocation = Utils.readObject("location");

  // Get new location
  let location = window.prompt("Where are you located?", previousLocation);
  Utils.saveObject("location", location)

  // Get the weather data at that location
  let weather = await Utils.getWeather(location);

  document.querySelector("#temp").innerHTML=`${weather.temp_f}°F `
  document.querySelector("#condition").innerHTML=`${weather.condition.text}<img src="${weather.condition.icon}" width="33px" />`
}

(function () {
  function checkTime(i) {
    return i < 10 ? "0" + i : i;
  }

  function startTime() {
    var today = new Date(),
      h = checkTime(today.getHours()),
      m = checkTime(today.getMinutes()),
      s = checkTime(today.getSeconds());
    let time = h + ":" + m;
    time = timeTo12HrFormat(time);
    document.getElementById("time").innerHTML = time;
    setTimeout(function () {
      startTime();
    }, 500);
  }
  startTime();

  async function loadWeather() {
    // Get the location
    let location = Utils.readObject("location");

    if (location == null) {
      location = prompt("Where are you located?")
      Utils.saveObject("location", location)
    }

    // Get the weather data at that location
    let weather = await Utils.getWeather(location);

    document.querySelector("#temp").innerHTML=`${weather.temp_f}°F `
    document.querySelector("#condition").innerHTML=`${weather.condition.text}<img src="${weather.condition.icon}" width="33px" />`

  }
  loadWeather();

})();

class Init {
  constructor() {
    this.dateDetails = null;
  }
}

class TabAction extends Init {
  constructor(props) {
    super(props);
  }
  setDateDetails() {
    this.dateDetails = getdateDetails();
  }
}

let tab = new TabAction();
tab.setDateDetails();
insertinDom();
function insertinDom() {
  document.getElementById(
    "date"
  ).innerHTML = `${tab.dateDetails.day}, ${tab.dateDetails.month} ${tab.dateDetails.date}`;
}
function getdateDetails() {
  var today = new Date();
  var day = today.getDay();
  var dd = today.getDate();
  var mm = today.getMonth();
  var yyyy = today.getFullYear();
  var dL = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  var mL = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return {
    day: dL[day],
    month: mL[mm],
    date: dd,
    year: yyyy,
  };
}

function timeTo12HrFormat(time) {
  let time_part_array = time.split(":");
  let ampm = "AM";
  if (time_part_array[0] >= 12) {
    ampm = "PM";
  }
  if (time_part_array[0] > 12) {
    time_part_array[0] = time_part_array[0] - 12;
  }
  let formatted_time = `${time_part_array[0]}:${time_part_array[1]} <span class="am_pm">${ampm}<span>`;
  return formatted_time;
}
