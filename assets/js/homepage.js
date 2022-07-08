var userFormEl = document.querySelector("#user-input");
var submitButtonEl = document.querySelector("#submitBtn");
var weatherContainerEl = document.querySelector("#weather-container");
var cityInputEl = document.querySelector("#city");

var formSubmitHandler = function(event) {
    // prevent page from refreshing
    event.preventDefault();

    //get a value from input element
    var cityName = cityInputEl.value.trim();

    if (city) {
        getCityWeather(city);

        //clear old content
        weatherContainerEl.textContent = "";
        cityInputEl.value = "";
    } else {
        alert("Please Enter a City Name");
    }
};

var buttonClickHandler = function(event) {
    getCityWeather();
    // clear old content
    weatherContainerEl.textContent = "";
}

var getCityWeather = function(city) {
    // format the api url
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}" + city + "/daily";

    //make a get request to url
    fetch(apiUrl)
        .then(function(response) {
            // request was successful
            if (response.ok) {
                console.log(response);
                response.json().then(function(data) {
                    console.log(data);
                    displayWeather(data, city);
                });
            } else {
                alert('Error: City Not Found');
            }
        })
        .catch(function(error) {
            alert("Unable to connect to Open Weather Map");
        });
};

var displayWeather = function(weather, searchTerm) {
    //check if api returned a city
    if (city.length === 0) {
        weatherContainerEl.textContent = "City not found.";
        return;
    }

    citySearchTerm.textContent = searchTerm;

    //create a span element to hold weather
    var titleEl = document.createElement("span");
    titleEl.textContent = weatherName;

    //append to container
    weatherEl.appendChild(titleEl);

    // create a status element
    var statusEl = document.createElement("span");
    statusEl.classList = "flex-row align-center";

    // append to container
    weatherEl.appendChild(statusEl);

    //append container to the dom
    weatherContainerEl.appendChild(weatherEl);
    };


// add event listeners to btn
userFormEl.addEventListener("click", formSubmitHandler);