import React from "react";
import "./css/style.css";
// import Weather from "./weather";
import { GiSunrise } from "react-icons/gi";
import { GiSunset } from "react-icons/gi";

export default class CurrentWeather extends React.Component {
  render() {
    const {
      cityName,
      temperature,
      weather_descriptions,
      weather_icons,
      pres,
      wind_spd,
      wind_cdir_full,
      uv,
      sunset,
      sunrise,
      clouds,
      rh,
      dayTime,
      vis,
      app_temp
    } = this.props;
    console.log(this.props);
    return (
      <div className="currentWeather">
        <div className="mainInfo">
          <h2
            className="header"
            style={{
              color: dayTime === false ? "white" : "#404040"
            }}
          >
            {cityName}
          </h2>
          {/* <div className="inner-container"> */}
          <div className="image">
            {weather_icons && (
              <img
                alt="bla"
                src={`https://www.weatherbit.io/static/img/icons/${weather_icons}.png`}
              ></img>
            )}
          </div>
          <p className="current-weather">{temperature}°</p>
          <p>Feels like {app_temp}°</p>
          {/* </div> */}
          <p className="footer">{weather_descriptions}</p>
        </div>
        <div className="additionalInfo">
          <div className="title">Pressure</div>
          <div className="value">{pres} Pa</div>

          <div className="title">UV Index</div>
          <div className="value">{uv} UV</div>

          <div className="title">
            <GiSunrise />
          </div>
          <div className="value">{sunrise}</div>

          <div className="title">
            <GiSunset />
          </div>
          <div className="value">{sunset}</div>

          <div className="title">Wind</div>
          <div className="value">
            {wind_spd} m/s {wind_cdir_full}
          </div>

          <div className="title">Humidity</div>
          <div className="value">{rh}%</div>

          <div className="title">Cloud coverage</div>
          <div className="value">{clouds}%</div>

          <div className="title">Visibility</div>
          <div className="value">{vis} km</div>
        </div>
      </div>
    );
  }
}
