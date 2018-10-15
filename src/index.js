const temp = document.getElementById("temp")
// запрос данных с API, преобразоване полученных данных в JSON
const activeWeather = document.getElementById("activeWeather")
const icon = document.getElementById("icon")
const wind = document.getElementById("wind")
const city = document.getElementById("city")

// Запрос геолокации
navigator.geolocation.getCurrentPosition(
    function (position) {
        fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=fa36f6e3bd7d694e6b8d6b9bfedc8221&lang=ru`).then((value) => value.json()).then((response) => {
            temp.innerHTML = response.main.temp
            activeWeather.innerHTML = response.weather[0].description
            icon.src = "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png"
            wind.innerHTML = response.wind.speed
            city.innerHTML = response.name
        })
    },
    function (error) {
        document.body.innerHTML = "Нет геопозиции - нет погоды, жадина"
    }

)
