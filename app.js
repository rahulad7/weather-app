let target = "bangalore";
const fetchWeatherDataByCountry = async (city) => {
  const api_key = "1d35dcc8063b4122ad764306233001";
  let url = `https://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${city}&days=7`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

<<<<<<< HEAD
let target = 'bangalore'
const fetchResults = async (cities) => {
    const api_key = "API KEY"
    let url = `https://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${cities}&days=7`
    const res = await fetch(url)
    const data = await res.json()
    console.log(data);
    document.querySelector(".temp").innerHTML = data.current.temp_c + "°c";
    document.querySelector(".city").innerHTML = data.location.name;

    const localTime = new Date( data.location.localtime).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    document.querySelector(".time").innerHTML = localTime;

    const time = new Date( data.location.localtime).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
    document.querySelector(".hi-low").innerHTML = time;

    document.querySelector(".image").innerHTML = `<img src= "https:${data.current.condition.icon}"/>`;
    document.querySelector(".weather").innerHTML = data.current.condition.text;
    const firstday = new Date(data.forecast.forecastday[0].date).toLocaleString('en-us', { weekday: 'short' });
    const secondday = new Date(data.forecast.forecastday[1].date).toLocaleString('en-us', { weekday: 'short' });
    const thirdday = new Date(data.forecast.forecastday[2].date).toLocaleString('en-us', { weekday: 'short' });
    document.querySelector("#date").innerHTML = firstday;
    document.querySelector("#date1").innerHTML = secondday;
    document.querySelector("#date2").innerHTML = thirdday;

    document.querySelector(".day-temp0").innerHTML = data.forecast.forecastday[0].day.avgtemp_c + "°c";
    document.querySelector(".day-temp1").innerHTML = data.forecast.forecastday[1].day.avgtemp_c + "°c";
    document.querySelector(".day-temp2").innerHTML = data.forecast.forecastday[2].day.avgtemp_c + "°c";
    document.querySelector(".day-image0").innerHTML = `<img src = "https:${data.forecast.forecastday[0].day.condition.icon}"/>`;
    document.querySelector(".day-image1").innerHTML = `<img src = "https:${data.forecast.forecastday[1].day.condition.icon}"/>`;
    document.querySelector(".day-image2").innerHTML = `<img src = "https:${data.forecast.forecastday[2].day.condition.icon}"/>`;

}

const searchInput = document.getElementById("searchInput")
const cityList = document.getElementById("cityList")
const searchform = document.querySelector(".searchform")
const result = document.querySelector(".result")
const searchbtn = document.querySelector(".searchbtn")

let cities = [];  // Array to store the city data
=======
const searchInput = document.getElementById("searchInput");
const cityList = document.getElementById("cityList");
const searchform = document.querySelector(".searchform");
const result = document.querySelector(".result");
const searchbtn = document.querySelector(".searchbtn");
>>>>>>> c2a95df (changed to declarative)

// Function to fetch the list of cities from the API
async function fetchCities() {
  const response = await fetch(
    "https://countriesnow.space/api/v0.1/countries/cities",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ country: "India" }),
    }
  );
  const data = await response.json();
  cities = data.data; //passing the data
  return cities;
}

function handleDropdownClick(city) {
  searchInput.value = city;
  result.style.display = "none";

  fetchWeatherDataByCountry(city).then((weatherData) => {
    renderWeekdayTemp(weatherData.forecast.forecastday);
    updateWeatherForecast(weatherData);
  });
}

// Function to render the city list or to declare
function renderCities(cityData) {
  cityList.innerHTML = "";

  for (let i = 0; i < cityData.length; i++) {
    const city = cityData[i];

    // Creating a element for all the cities each "p"
    const listItem = document.createElement("div");
    listItem.textContent = city;

    // Add click event listener to populate search input
    listItem.addEventListener("click", () => handleDropdownClick(city));

    // Append list item to the city list
    cityList.appendChild(listItem);
  }
}

// Function to filter the cities based on search input
function filterCities() {
  const searchValue = searchInput.value.toLowerCase();
  const filteredCities = cities.filter((city) =>
    city.toLowerCase().includes(searchValue)
  );
  renderCities(filteredCities);
}

function searchbtnClick(e) {
  e.preventDefault();
  const searchvalue = searchInput.value;
  result.style.display = "none ";
  fetchWeatherDataByCountry(searchvalue).then((weatherData) => {
    renderWeekdayTemp(weatherData.forecast.forecastday);
    updateWeatherForecast(weatherData);
  });
}

// Event Listener for form submission
searchbtn.addEventListener("click", searchbtnClick);

searchInput.addEventListener("focusin", () => {
  result.style.display = "block";
});

searchInput.addEventListener("input", filterCities);

fetchCities().then((cities) => renderCities(cities));

function getWeekDayFromDate(date) {
  return new Date(date).toLocaleString("en-us", { weekday: "short" });
}

function updateWeatherForecast(weatherData) {
  document.querySelector(".temp").innerHTML =
    Math.round(weatherData.current.temp_c) + "°c";
  document.querySelector(".city").innerHTML = weatherData.location.name;

  const localTime = new Date(weatherData.location.localtime).toLocaleDateString(
    "en-uS",
    {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );
  document.querySelector(".time").innerHTML = localTime;

  const time = new Date(weatherData.location.localtime).toLocaleTimeString(
    "en-uS",
    {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }
  );
  document.querySelector(".hi-low").innerHTML = time;

  document.querySelector(
    ".image"
  ).innerHTML = `<img src= "https:${weatherData.current.condition.icon}"/>`;
  document.querySelector(".weather").innerHTML =
    weatherData.current.condition.text;
}

//return the html
function getWeekdayTempHtml(day, imgsrc, temperature) {
  return `<div class="weather-forecast">
            <div class="weather-forecast-item">
                <div id="date">${day}</div>
                <div class="day-image1">
                <img src="${imgsrc}" alt="">
                </div>
                <div class="day-temp1">${Math.round(temperature)}&#176; C</div>
            </div>
        </div>`;
}

//insert and render in the html
function renderWeekdayTemp(forecastDays) {
  const container = document.querySelector(".future-forecast");
  container.innerHTML = "";
  forecastDays.forEach((forecastObj) => {
    const {
      date,
      day: {
        avgtemp_c,
        condition: { icon },
      },
    } = forecastObj; //Destructuring
    const weekDay = getWeekDayFromDate(date);
    const weekDayTempHtml = getWeekdayTempHtml(weekDay, icon, avgtemp_c);
    container.insertAdjacentHTML("beforeend", weekDayTempHtml);
  });
}

// geolocation to find the weather of current location
function getCurrentLocation() {
  // return new Promise((resolve, reject) => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(handleGeolocationSuccess, error);
  }
  // });
}

function handleGeolocationSuccess(lanLong) {
  const latitude = lanLong.coords.latitude;
  const longitude = lanLong.coords.longitude;
  fetchaAllFunctions(`${latitude},${longitude}`);
}
function error() {
  fetchaAllFunctions("haliyal");
}

// to show default getWeekdayTempHtml
getCurrentLocation();

function fetchaAllFunctions(query) {
  fetchWeatherDataByCountry(query).then((weatherData) => {
    renderWeekdayTemp(weatherData.forecast.forecastday);
    updateWeatherForecast(weatherData);
  });
}
