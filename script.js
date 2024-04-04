const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');
const temperatureValueElement = document.getElementById('temperatureValue');
const visibility = document.getElementById('visiblity');


const location_not_found = document.querySelector('.location-not-found');

const weather_body = document.querySelector('.weather-body');
searchBtn.addEventListener('click', () => {
    // Get the value from the input box
    const city = inputBox.value;
    // Call the checkWeather function with the city value
    checkWeather(city);
});

async function checkWeather(city){          // used async function to synchronise the check weather location and used api keys from open weather site 
    const api_key = "89f4fe73cabc9790b6fe6bacbf7e73ec";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;    // fetching api from open weather site 

    const weather_data = await fetch(`${url}`).then(response => response.json());

    if(weather_data.cod === `404`){                // checking the location otherwise it will show 404 error to the user
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        console.log("error");
        return;
    }

    console.log("run");
    location_not_found.style.display = "none";
    weather_body.style.display = "flex";
   
    description.innerHTML = `${weather_data.weather[0].description}`;

    humidity.innerHTML = `${weather_data.main.humidity}%`;  //getting the current humidity from current weather
    wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`;  // getting wind speed 
    temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;  // getting current weather temperature
    temperatureValueElement.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
    visibility.innerHTML = `${weather_data.visibility}Km`;    // shows the visibilty 

    switch(weather_data.weather[0].main){
        case 'Clear':
            weather_img.src = "assets/sun.jpg";
            break;                                         // used switch statement to show the right image according to the weather
        case 'Clouds':
            weather_img.src = "assets/cloud.jpg";
            break;
        case 'Rain':
            weather_img.src = "assets/Rain.jpg";
            break;
        case 'Mist':
            weather_img.src = "assets/Mist.jpg";
            break;
        case 'Snow':
            weather_img.src = "assets/snow.jpg";
            break;
        case 'Thunderstorm':
            weather_img.src = "assets/thunderstorm.jpg"    
    }

    console.log(weather_data);              // At last console the weather data 
}
