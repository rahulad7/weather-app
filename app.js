
let target = 'bangalore'
const fetchResults = async (cities) => {
    const api_key = "1d35dcc8063b4122ad764306233001"
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

// Function to fetch the list of cities from the API
async function fetchCities() {

    const response = await fetch('https://countriesnow.space/api/v0.1/countries/cities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ country: 'India' })
    });
    const data = await response.json();
    console.log(data);
    cities = data.data; //passing the data
    renderCities(cities);
}

// Function to render the city list or to declare
function renderCities(cityData) {
    cityList.innerHTML = '';

    for (let i = 0; i < cityData.length; i++) {
        const city = cityData[i];

        // Creating a element for all the cities each "p"
        const listItem = document.createElement('div');
        listItem.textContent = city;

        // Add click event listener to populate search input
        listItem.addEventListener('click', function () {
            searchInput.value = city;
            result.style.display = "none"
            const values = searchInput.value;
            fetchResults(values)
        })

        // Append list item to the city list
        cityList.appendChild(listItem)
    }
}

// Function to filter the cities based on search input
function filterCities() {
    const searchValue = searchInput.value.toLowerCase();
    const filteredCities = cities.filter(city => city.toLowerCase().includes(searchValue));
    renderCities(filteredCities);
}
// Event Listener for form submission
// searchform.addEventListener('submit', function (e) {
//     e.preventDefault()
//     const searchvalue = searchInput.value;
//     fetchResults(searchvalue)
// })

searchbtn.addEventListener('click', function(e){
    e.preventDefault()
    const searchvalue = searchInput.value;
    fetchResults(searchvalue)
})


searchInput.addEventListener("focusin", () => {
    result.style.display = "block"
})

searchInput.addEventListener('input', filterCities);

fetchResults()
fetchCities();







