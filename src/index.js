if (navigator.onLine === false) {

    alert('Для корректной работы приложения необходим доступ к Интернету')
} else {
    init()
}

function init() {
    const {
        APPID
    } = require('./config');

    const temp = document.getElementById("temp")
    // запрос данных с API, преобразование полученных данных в JSON
    const activeWeather = document.getElementById("activeWeather")
    const icon = document.getElementById("icon")
    const wind = document.getElementById("wind")
    const city = document.getElementById("city")
    const today = document.getElementsByClassName("today")[0]
    const tomorrow = document.getElementsByClassName("tomorrow")[0]
    const theDayAfterTomorrow = document.getElementsByClassName("theDayAfterTomorrow")[0]
    const app = document.getElementsByClassName("container")[0]

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
                    // list[""0""].weather[""0""].main
                    fetch(`https://pixabay.com/api/?key=10451328-bd146c8c607b04a23ec6a233c&category=nature&pretty=true&q=${response.weather[0].main}`).then((value) => value.json()).then((pictureList) => {
                        const pictureURL = pictureList.hits[0].largeImageURL
                        app.style.backgroundImage = `url(${pictureURL})`

                    })

                })
            },
            function (error) {
                document.body.innerHTML = "Нет геопозиции - нет погоды, жадина"
            }

        )



    }
    // обработчик события
    function makeButtonActive(event) {
        const currentButton = event.target;
        const previouslyActive = document.querySelector("button.active");
        previouslyActive.classList.remove("active")
        currentButton.classList.add("active")

    }
    dayDefiner(0)

    today.addEventListener("click", (event) => {
        dayDefiner(0);
        makeButtonActive(event)
    })
    tomorrow.addEventListener("click", (event) => {
        dayDefiner(1);
        makeButtonActive(event)
    })
    theDayAfterTomorrow.addEventListener("click", (event) => {
        dayDefiner(2);
        makeButtonActive(event)
    })
}