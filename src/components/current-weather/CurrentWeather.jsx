import React from "react";
import "./currentWeather.css";

const CurrentWeather = ({ data }) => {
  return (
    <div
      title="current weather"
      className={`weather bg-center bg-cover`}
      style={{
        backgroundImage: `url("/${data.weather[0].description
          .toLowerCase()
          .replace(" ", "-")}.png")`,
      }}
    >
      {console.log(data)}
      <div className="bg-[#ffffff4f] p-4 z-30 w-[100%]">
        <div className="top ">
          <div>
            <p className="city text-2xl font-bold">
              {data.name}, {data.sys.country}
            </p>
            <p className="weather-description text-md font-semibold">
              {data.weather[0].description}
            </p>
          </div>
          <img
            alt="weather"
            className="weather-icon overflow-hidden"
            src={`/icons/${data.weather[0].icon}.png`}
          />
        </div>
        <div className="bottom">
          <p className="temperature">{Math.round(data.main.temp)}°C</p>
          <div className="details">
            <div className="parameter-row font-semibold">
              <span className="parameter-label">Details</span>
            </div>
            <div className="parameter-row">
              <span className="parameter-label">Feels like</span>
              <span className="parameter-value">
                {Math.round(data.main.feels_like)}°C
              </span>
            </div>
            <div className="parameter-row">
              <span className="parameter-label">Max Temp</span>
              <span className="parameter-value">{data.main.temp_max}°C</span>
            </div>
            <div className="parameter-row">
              <span className="parameter-label">Min Temp</span>
              <span className="parameter-value">{data.main.temp_min}°C</span>
            </div>
            <div className="parameter-row">
              <span className="parameter-label">Wind</span>
              <span className="parameter-value">{data.wind.speed} m/s</span>
            </div>
            <div className="parameter-row">
              <span className="parameter-label">Humidity</span>
              <span className="parameter-value">{data.main.humidity}%</span>
            </div>
            <div className="parameter-row">
              <span className="parameter-label">Pressure</span>
              <span className="parameter-value">{data.main.pressure} hPa</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
