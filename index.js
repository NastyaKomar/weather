let curentDataCont = document.getElementById("date");
let now = new Date();
let input = document.querySelector("input");
let city = document.querySelector(".city");
let temp = document.querySelector(".temp");
let fells = document.querySelector(".fells");

let max = document.querySelector(".max");
let min = document.querySelector(".min");

let wind = document.querySelector(".wind");
let onHourDiv = document.querySelectorAll(".onHourDiv");
let onHour = document.querySelectorAll(".onHour");
let imgWeather = document.querySelector(".sunpic");

let week = document.querySelectorAll(".week");

let options = {
  era: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  weekday: 'long',
};

let arr = now.toLocaleString("eng", options).split(",");

console.log(now.toLocaleString("eng", options))
console.log(arr)

curentDataCont.innerText = arr[0] + "," + " " + arr[1].split(" ")[2] + " " + arr[1].split(" ")[1];

input.addEventListener('keyup', (e) => {
  if (e.key == 'Enter' && input.value) {
    getWeather(input.value)

  }
})


async function getWeather(place) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${place}&units=metric&appid=66b3c3e1676ddd60a73d8a3160445061`;
  const res = await fetch(url);
  const data = await res.json();
  render(data)
}
function render(data) {

  console.log(data);
  temp.innerText = Math.round(data.list[0].main.temp) + "°";
  fells.innerText = `Feels like ${Math.round(data.list[0].main.feels_like)} °`;
  max.innerText = Math.round(data.list[0].main.temp_max) + "°";
  min.innerText = Math.round(data.list[0].main.temp_min) + "°";
  wind.innerText = `SSW ${Math.round(data.list[0].wind.speed)} km/h`;
  setCloud(imgWeather, data.list[0].clouds.all);
  setPop(imgWeather, data.list[0].pop);
  onHourDiv.forEach((el, index) => {
    el.innerText = Math.round(data.list[index + 1].main.temp) + "°";
  })

  onHour.forEach((el, index) => {
    el.innerText = data.list[index + 1].dt_txt.split(" ")[1].split(":")[0] + ":" + "00";

  });


  setDay(data);
  setNight(data);
}

function setDay(data) {
  let res = getWeekWheather(data, "12:00:00");
  console.log(res);
  week.forEach((elem, index) => {
    let item = data.list[res[index]];
    elem.querySelector(".day").innerText = Math.round(item.main.temp) + "°";
    let date =  new Date(item.dt_txt);
    elem.querySelector(".a").innerText = date.toLocaleString("eng", options).split(",")[0];
    setWeather(elem.querySelector(".b").querySelector("img"), item.weather[0].main);
    console.log(elem.querySelector(".b"));
  });
}

function setNight(data) {
  let res = getWeekWheather(data, "00:00:00");
  week.forEach((elem, index) => {
    let item = data.list[res[index]];
    elem.querySelector(".night").innerText = Math.round (item.main.temp) + "°";
  });
}


function setCloud(img, clouds) {

  if (clouds < 20) {
    img.src = "./images/3DIco_33.png";
  }
  if (clouds > 20) {
    img.src = "./images/3DIco_01.png";
  }
}
function setPop(img, pop) {
  if (pop>0.5) {
    img.src = "./images/3DIco_17.png";
  }
  
}

function getWeekWheather(data, time) {
  let res = []
  data.list.forEach((elem, index) => {
      if (elem.dt_txt.indexOf(time) != -1) {
          res.push(index)
      }
  });
  return res;
}

function setWeather(img, code) {
  if (code.toLowerCase() == "rain" ) {
    img.src ="./images/Ico_38.png";
  } else if (code.toLowerCase() == "clear") {
    img.src ="./images/Ico_13.png";
  } else if (code.toLowerCase() == "snow") {
    img.src = "./images/Ico_49.png";
  } else {
    img.src = "./images/Ico_01.png";
  }
}



