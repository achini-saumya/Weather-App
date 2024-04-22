const apikey = "c80537a63d1ff57ed8e544bae6d3d3b2";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const search = document.querySelector(".city");
const searchbtn = document.querySelector(".btn");
const icon = document.querySelector("#one");
const body = document.querySelector("body");

async function checkWeather(city) {
    try {
        const response = await fetch(apiurl + city + `&appid=${apikey}`);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();

        document.querySelector(".city_name").innerHTML = data.name;
        document.querySelector(".tmp").innerHTML = Math.floor(data.main.temp) + " °C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        const currentTime = new Date().getTime();
        const sunrise = data.sys.sunrise * 1000; // Convert seconds to milliseconds
        const sunset = data.sys.sunset * 1000; // Convert seconds to milliseconds
        const isDayTime = currentTime > sunrise && currentTime < sunset;

        if (data.weather[0].main === "Clouds") {
            icon.src = isDayTime ? "Assets/clouds.png" : "Assets/moon_clouds.png";
        } else if (data.weather[0].main === "Clear") {
            icon.src = isDayTime ? "Assets/clear.png" : "Assets/moon.png";
        } else if (data.weather[0].main === "Rain") {
            icon.src = isDayTime ? "Assets/rain.png" : "Assets/moon_rain.png";
        } else if (data.weather[0].main === "Drizzle") {
            icon.src = isDayTime ? "Assets/drizzle.png" : "Assets/moon_drizzle.png";
        } else if (data.weather[0].main === "Mist") {
            icon.src = isDayTime ? "Assets/mist.png" : "Assets/moon_mist.png";
        } else if (data.weather[0].main === "Snow") {
            icon.src = isDayTime ? "Assets/snow.png" : "Assets/moon_snow.png";
        }

        body.style.backgroundImage = isDayTime ? "url('Assets/day.png')" : "url('Assets/night.jpg')";

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    } catch (error) {
        console.error(error);
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
}

searchbtn.addEventListener("click", () => {
    checkWeather(search.value);
});
