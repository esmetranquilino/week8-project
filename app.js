function updateWeather (res) {
    let temperature = document.querySelector("#temperature")
    let currentTemp = res.data.temperature.current;
    let city = document.querySelector("#display-city");
    let weatherDesc = document.querySelector("#weather-desc");
    let humidityDesc = document.querySelector("#humidity-desc");
    let windSpeed = document.querySelector("#wind-speed");
    let time = document.querySelector("#time");
    let date = new Date(res.data.time * 1000);
    let weatherIcon = document.querySelector("#weather-icon")
    
    
    
    weatherIcon.innerHTML = `<img src="${res.data.condition.icon_url}" class="temp-icon"/>`;
    city.innerHTML = res.data.city;
    weatherDesc.innerHTML = res.data.condition.description;
    humidityDesc.innerHTML = `${res.data.temperature.humidity}%`;
    temperature.innerHTML = Math.round(currentTemp);
    windSpeed.innerHTML = `${res.data.wind.speed}km/h`;
    time.innerHTML = formatDate(date)
   
    console.log(res.data)
}

function formatDate (date) {
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = weekdays[date.getDay()];

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    return `${day} ${hour}:${minutes}`
}


function searchCity (city) {
    let apiKey = "016a0t85f68c4oda9e60b9cd7345774b"
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    // console.log(apiUrl);
    axios.get(apiUrl).then(updateWeather);
}


function searchSubmit (event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input")
    searchCity(searchInput.value)
}

let searchFormElement = document.querySelector("#search-form")
searchFormElement.addEventListener("submit", searchSubmit)

searchCity("Los Angeles")