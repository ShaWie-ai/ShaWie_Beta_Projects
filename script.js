const inputValue = document.getElementById("inputValue");
const imgContainer = document.getElementById("imgContainer");
const lastContainer = document.getElementById("lastContainer");
const tempContainer = document.getElementById("tempContainer");
const temperature = document.getElementById("temperature");
const desciption = document.getElementById("desciption");
const humidityTemp = document.getElementById("humidityTemp");
const windSpeed = document.getElementById("windSpeed");
const img = document.getElementById("img");

const apiKey = "7ff521a3050df9cd5f7afd22c9e5d160";

inputValue.addEventListener("keypress", function(event) {
    if(event.key === "Enter") {
        searchBtn();
    }
})

async function searchBtn() {

    const city = inputValue.value;

    if (city) {
        try {
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

            const response = await fetch(apiUrl);
            const data = await response.json(); 

            switch(data.weather[0].main) {
                case 'Clear':
                    img.src = "clearCloud.png";
                    break;
                case 'Rain':
                    img.src = "rain.png";
                    break;
                case 'Snow':
                    img.src = "snow.png";
                    break;
                case 'Clouds':
                    img.src = "cloudyCloud.png";
                    break;
                case 'Mist':
                    img.src = "mist.png";
                    break;
                case 'Haze':
                    img.src = "haze.png";
                    break;
                default:
                    img.src = "clearCloud.png"
                    break;
            }

            const celsius = parseInt(data.main.temp - 273.15);
            const humidity = data.main.humidity;
            const wind = data.wind.speed;

            temperature.textContent = `${celsius}°C`;
            desciption.textContent = data.weather[0].description;
            humidityTemp.textContent = `${humidity}%`;
            windSpeed.textContent = `${wind}km/h`

            imgContainer.style.display = "flex";
            lastContainer.style.display = "flex";
            tempContainer.style.display = "block";

        } catch (error) {
            console.error(error);
        }

    } else {
        alert("Please enter a location");
    }
}
