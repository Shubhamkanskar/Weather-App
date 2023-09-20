import hotbg from "./assets/sunnyweather.jpg";
import coldimg from "./assets/rainyweather.jpg";
import Description from "./components/Description";
import { useEffect, useState } from "react";
import { getFormattedWeatherData } from "./WeatherServices";

const App = () => {
  const [city, setCity] = useState("pune");
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");
  const [bg, setbg] = useState(hotbg);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getFormattedWeatherData(city, units);
      setWeather(data);

      //dynamic bg
      const threshold = units === "metric" ? 20 : 60;
      if (data.temp <= threshold) setbg(coldimg);
    };
    fetchWeatherData();
  }, [units, city]);

  const handleUnitsClick = () => {
    setUnits((prevUnits) => (prevUnits === "metric" ? "imperial" : "metric"));
  };

  const enterKeyPressed = (e) => {
    if (e.key === "Enter") {
      setCity(e.currentTarget.value);
    }
  };

  return (
    <>
      <div className="app" style={{ backgroundImage: `url(${bg})` }}>
        <div className="overlay">
          {weather && (
            <div className="container">
              <div className="section section_inputs">
                <input
                  onKeyDown={enterKeyPressed}
                  type="text"
                  name="city"
                  placeholder="Enter Your City..."
                />
                <button onClick={handleUnitsClick}>
                  °{units === "metric" ? "F" : "C"}
                </button>
              </div>
              <div className="section  section_temperature">
                <div className="icon">
                  <h3>{`${weather.name}, ${weather.country}`}</h3>
                  <img
                    src={weather.iconURL}
                    style={{ height: "70px", width: "70px" }}
                    alt="iconURL"
                  />
                  <h3>{weather.description}</h3>
                </div>
                <div className="temperature">
                  <h1>{`${weather.temp.toFixed()}°${
                    units === "metric" ? "C" : "F"
                  }`}</h1>
                </div>
              </div>
              {/* bottom description */}
              <Description weather={weather} units={units} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default App;
