// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

const searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || []

let weather = {
  "apiKey": "bce2edb22d99fdf5968dbe176d100590",
  fetchWeather: function (city) {
    fetch("https://api.openweathermap.org/data/2.5/forecast?q="
      + city
      + "&units=imperial&appid="
      + this.apiKey
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    console.log(data)
    const date = data.list[0].dt_txt;
    const { name } = data.city;
    searchHistory.push(name)
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory))
    const { icon, description } = data.list[0].weather[0];
    const { temp, humidity } = data.list[0].main;
    const { speed } = data.list[0].wind;
    console.log(date, name, icon, description, temp, humidity)
    // Need temperature and icon to show in all boxes

    
   
    document.querySelector(".city").innerText = "What's the weather in " + name + "?";
    document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerHTML = "Clouds: " + description;
    document.querySelector(".temp").innerHTML = temp + "&#8457";
    document.querySelector(".humidity").innerHTML = "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerHTML = "Wind Speed: " + speed + " mph";
    document.querySelector(".weather").classList.remove("loading")
    var fiveDays = []
    for (var i = 0; i < data.list.length; i += 8) {
      fiveDays.push(data.list[i])
    }
    console.log(fiveDays)
    for (var i = 0; i < fiveDays.length; i++) {
      console.log(document.querySelector(`.description${i}`))
      document.querySelector(`.description${i}`).innerHTML = "Clouds: " + fiveDays[i].weather[0].description;
    }
    for (var i = 0; i < fiveDays.length; i++) {
      console.log(document.querySelector(`.humidity${i}`))
      document.querySelector(`.humidity${i}`).innerHTML = "Humidity: " + fiveDays[i].main.humidity + "%";
    }

    for (var i = 0; i < fiveDays.length; i++) {
      console.log(document.querySelector(`.temp${i}`))
      document.querySelector(`.temp${i}`).innerHTML = fiveDays[i].main.temp + "&#8457;"
    }

    for (var i = 0; i < fiveDays.length; i++) {
      console.log(document.querySelector(`.wind${i}`))
      document.querySelector(`.wind${i}`).innerHTML = "Wind Speed: " + fiveDays[i].wind.speed;
    }

    for (var i = 0; i < fiveDays.length; i++) {
      console.log(document.querySelector(`.date${i}`))
      document.querySelector(`.date${i}`).innerHTML = fiveDays[i].dt_txt;
    }

    for (var i = 0; i < fiveDays.length; i++) {
      console.log(document.querySelector(`.icon${i}`))
      document.querySelector(`.icon${i}`).innerHTML = fiveDays[i].list.icon;
    }















  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  }
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
  if (event.key == "Enter") {
    weather.search();
  }
});
