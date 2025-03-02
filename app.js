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
   

    getForecast(res.data.city);

    // console.log(res.data)
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

//****** forecast data ******

function getForecast (city) {
    let apiKey = "016a0t85f68c4oda9e60b9cd7345774b";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    axios(apiUrl).then(displayForecast);
};

function getDays (timestamp) {
    let date = new Date(timestamp * 1000);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

    return days[date.getDay()];
}


function displayForecast (res) {
    console.log(res.data)

    let forecastHtml= "";


    res.data.daily.forEach(function(day, index){
        if (index < 5) {
            forecastHtml =
              forecastHtml +
              `
                <div class="forecast-day">
                    <div class="forecast-date">${getDays(day.time)}</div>
                    <div class="forecast-icon">
                        <img src="${day.condition.icon_url}" class="forecast-icon"/>
                    </div>
                    <div class="forecast-temperatures">
                        <div class="forecast-temp">
                            <strong>${Math.round(day.temperature.maximum)}°</strong>
                        </div>
                        <div class="forecast-temp">${Math.round(day.temperature.minimum)}°</div>
                    </div>
                </div>
        
            `;

        }

        
                   
    });

    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = forecastHtml;

}

let searchFormElement = document.querySelector("#search-form")
searchFormElement.addEventListener("submit", searchSubmit)

searchCity("Los Angeles");
// displayForecast();
 

