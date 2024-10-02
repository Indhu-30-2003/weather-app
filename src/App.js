import humidityImg from "./assests/humidity.png";
import cloudy from "./assests/cloudy.jpg";
import rainy from "./assests/rainy.jpg";
import weatherBackground from "./assests/weather background.jpg";
import stromy from "./assests/stromy.jpg";
import sunny from "./assests/sunny.jpg";
import windImg from "./assests/wind.png";
import windy from "./assests/windy.jpg";
import mist from "./assests/mist.jpg"
import { useState } from "react";
import axios from "axios";
import tempo from "./assests/tempo.jpg"
import haze from "./assests/haze.jpg"
function App() {
  const [city, setCity] = useState("");
  const [humidity1, setHumidity] = useState("");
  const [temperature, setTemperature] = useState("");
  const [windSpeed, setWindSpeed] = useState("");
  const [weatherCondition, setWeatherCondition] = useState(""); 
  const [weatherImg, setWeatherImg] = useState(tempo );  

  function handleCity(evt) {
    setCity(evt.target.value);
  }

  function getWeather() {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=339bc7175527a8543372d8095254d9c7&units=metric`)
      .then(function (success) {
        console.log(success.data);
        setHumidity(success.data.main.humidity);
        setWindSpeed(success.data.wind.speed);
        setTemperature(success.data.main.temp);
        setWeatherCondition(success.data.weather[0].main); 

       
        updateWeatherImg(success.data.weather[0].main);
      })
      .catch(function (error) {
        console.error("Error fetching weather data:", error);
      });
  }

 
  function updateWeatherImg(weatherCondition) {
    switch (weatherCondition.toLowerCase()) {
      case "rain":
        setWeatherImg(rainy);
        break;
      case "clouds":
        setWeatherImg(cloudy);
        break;
      case "storm":
      case "thunderstorm":
        setWeatherImg(stromy);
        break;
      case "clear":
        setWeatherImg(sunny);
        break;
      case "wind":
      case "breeze":
        setWeatherImg(windy);
        break;
    case "mist":
            setWeatherImg(mist);
            break;
    case "haze":
                setWeatherImg(haze);
                break;
      default:
        setWeatherImg(weatherBackground); 
        break;
    }
  }

  return (
    <>
      <div className="card">
        <h1>Weather Report</h1>
        <div className="search">
          <input
            type="text"
            placeholder="Enter city name"
            spellCheck="true"
            className="inputtag"
            value={city}
            onChange={handleCity}
          />
          <button className="btn" onClick={getWeather}>
            <i className="fa-solid fa-magnifying-glass-location" style={{ color: "#131415" }}></i>
          </button>
        </div>
        <div className="weather">
          <img className="weatherimg" src={weatherImg} alt="weather icon" /> 
          {/* <h1 className="temp">{temperature} °C</h1> */}
          <h2 className="city">{city.toUpperCase()}</h2>
          <h2 className="weatherCondition">Weather :{weatherCondition}</h2> 
        </div>
        <div className="details">
          <div className="col1">
            <img src={humidityImg} className="humidity" alt="humidity icon" />
            <div>
              <p className="humidity_para">{humidity1}%</p>
              <p>Humidity</p>
            </div>
          </div>
          <div className="col1">
            <img src={windImg} className="humidity" alt="wind icon" />
            <div>
              <p className="wind_para">{windSpeed} km/h</p>
              <p>Wind Speed</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
