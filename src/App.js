import "./App.css";
import axios from "axios";
import { useState } from "react";
import {
  WiHumidity,
  WiWindy,
  WiCloud,
  WiLightning,
  WiDayShowers,
  WiDaySnow,
  WiTornado,
  WiDaySunny,
  WiCloudy,
  WiFog,
} from "react-icons/wi";

function App() {
  const [infoCity, setInfoCity] = useState();
  const [inputValue, setInputValue] = useState();

  const formatCity = (cityName) => {
    const newCityName = cityName.replace(" ", "+");
    return newCityName;
  };

  const getPicto = (weatherName) => {
    switch (weatherName) {
      case "Thunder":
        return <WiLightning className="icon" />;

      case "Drizzle":
        return <WiDayShowers className="icon" />;

      case "Snow":
        return <WiDaySnow className="icon" />;

      case "Tornado":
        return <WiTornado className="icon" />;

      case "Clear":
        return <WiDaySunny className="icon" />;

      case "Clouds":
        return <WiCloudy className="icon" />;

      case "Mist":
      case "Smoke":
      case "Haze":
      case "Dust":
      case "Fog":
      case "Sand":
      case "Ash":
      case "Squall":
        return <WiFog className="icon" />;

      default:
        break;
    }
  };

  const searchCity = (e) => {
    e.preventDefault();

    const city = formatCity(inputValue);
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a4c1334b2c01cf17ea33f1825bcd5f3f`
      )
      .then((res) => setInfoCity(res.data));
    console.log(infoCity);
  };

  const dateBuilder = (timezone) => {
    const nowInLocalTime = Date.now() + 1000 * (timezone / 3600);
    const millitime = new Date(nowInLocalTime);
    const dateFormat = millitime.toLocaleString();

    let day = millitime.toLocaleString("en-US", { weekday: "long" });
    let month = millitime.toLocaleString("en-US", { month: "long" });
    let date = millitime.toLocaleString("en-US", { day: "numeric" });
    let year = millitime.toLocaleString("en-US", { year: "numeric" });
    let hours = millitime.toLocaleString("en-US", { hour: "numeric" });
    let minutes = millitime.toLocaleString("en-US", { minute: "numeric" });

    return `${day} ${date} ${month} ${year} - ${hours}:${minutes}`;
  };

  return (
    <div className="container-content">
      <div className="container-search">
        <h1 className="title">Weather App</h1>
        <form onSubmit={searchCity} className="middle-part">
          <input
            type="text"
            placeholder="Search for a city..."
            onChange={(e) => setInputValue(e.target.value)}
            className="input-search"
          />
        </form>
        <div className="right-part"></div>
      </div>

      <div className="container-research">
        {infoCity ? (
          <div className="container-result">
            <div>
              <p className="name">{infoCity.name}</p>
              <p className="date">{dateBuilder(infoCity.timezone)}</p>
            </div>

            <div>
              {getPicto(infoCity.weather[0].main)}
              <p className="temperature">
                {Math.floor(infoCity.main.temp - 273.15)} °
              </p>
            </div>

            <div className="container-details">
              <div className="container-item">
                <WiWindy className="picto" />
                <p>{Math.floor(infoCity.wind.speed * 3.6)} Km/h</p>
              </div>
              <div className="container-item">
                <WiHumidity className="picto" />
                <p>{infoCity.main.humidity}%</p>
              </div>
              <div className="container-item">
                <WiCloud className="picto" />
                <p>{infoCity.clouds.all}%</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="container-result">
            <h1>Search a city</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

// a4c1334b2c01cf17ea33f1825bcd5f3f

// https://api.openweathermap.org/data/2.5/weather?q=New+York&appid=a4c1334b2c01cf17ea33f1825bcd5f3f
