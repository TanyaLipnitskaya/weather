const {
    APPID
} = require('./config');

const temp = document.getElementById("temp")
// запрос данных с API, преобразоване полученных данных в JSON
const activeWeather = document.getElementById("activeWeather")
const icon = document.getElementById("icon")
const wind = document.getElementById("wind")
const city = document.getElementById("city")
const today = document.getElementsByClassName("today")[0]
const tomorrow = document.getElementsByClassName("tomorrow")[0]
const theDayAfterTomorrow = document.getElementsByClassName("theDayAfterTomorrow")[0]

function dayDefiner(day) {
    // Запрос геолокации
    navigator.geolocation.getCurrentPosition(
        function (position) {
            fetch(`http://api.openweathermap.org/data/2.5/forecast/daily?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${APPID}&lang=ru`).then((value) => value.json()).then((responseList) => {
                const response = responseList.list[day]
                temp.innerHTML = response.temp.day
                activeWeather.innerHTML = response.weather[0].description
                icon.src = "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png"
                wind.innerHTML = response.speed
                city.innerHTML = responseList.city.name
            })
        },
        function (error) {
            document.body.innerHTML = "Нет геопозиции - нет погоды, жадина"
        }

    )



}
dayDefiner(0)

today.addEventListener("click", () => dayDefiner(0))
tomorrow.addEventListener("click", () => dayDefiner(1))
theDayAfterTomorrow.addEventListener("click", () => dayDefiner(2))