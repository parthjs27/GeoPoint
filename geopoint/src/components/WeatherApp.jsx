import React, { useEffect, useState } from "react";
import "./css/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapPin } from "@fortawesome/free-solid-svg-icons";

const WeatherApp = () => {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const [city, setCity] = useState(null);
  const [search, setSearch] = useState("Mumbai");

  useEffect(() => {
    const fetchAPI = async () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${API_KEY}`;
      const response = await fetch(url);
      const resJson = await response.json();
      setCity(resJson.main);
    };
    fetchAPI();
  }, [search]);

  return (
    <>
      <div className="container">
        <input
          type="search"
          className="searchData"
          placeholder="Enter City"
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />

        {!city ? (
          <p className="invalidCity">No Data Found</p>
        ) : (
          <>
            <div className="weatherData">
              <div className="location">
                <FontAwesomeIcon icon={faMapPin} className="map-pin" />
                <h2>{search}</h2>
              </div>

              <h1>{city.temp} °C</h1>

              <div className="bg-min-max-temp">
                <h3 className="temp_min_max">
                  Min Temp: {city.temp_min} °C <br/>Max Temp: {city.temp_max} °C
                </h3>
                <h3 className="temp_min_max">
                  Humidity: {city.humidity} % | Pressure: {city.pressure} hPa
                </h3>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default WeatherApp;
