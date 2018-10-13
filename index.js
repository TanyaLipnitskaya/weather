const temp = document.getElementById("temp")
// запрос данных с API, преобразоване полученных данных в JSON
fetch("http://api.openweathermap.org/data/2.5/weather?q=NOVOSIBIRSK&units=metric&appid=fa36f6e3bd7d694e6b8d6b9bfedc8221").then((value) => value.json()).then((value) => temp.innerHTML = value.main.temp)