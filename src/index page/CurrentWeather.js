import React from "react";
import "./css/style.css";
// import Weather from "./weather";

export default class CurrentWeather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

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
      sunrise
    } = this.props;
    return (
      <div className="currentWeather">
        <h2 className="header">{cityName}</h2>
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
        {/* </div> */}
        <p className="footer">{weather_descriptions}</p>
        <div>
          {" "}
          <p> {pres} Pa</p>
          <p> {uv} UV</p>
          <p>
            {" "}
            {sunrise} sunrise {sunset} sunset
          </p>
          <p>
            {" "}
            Wind {wind_spd} {wind_cdir_full}{" "}
          </p>
        </div>
      </div>
    );
  }
}
