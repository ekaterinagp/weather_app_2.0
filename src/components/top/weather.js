import React from "react";
import "./style.css";
import SunImg from "../../img/sun.png";

export default class Weather extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      cityName,
      temperature,

      weather_descriptions,
      weather_icons
    } = this.props;

    return (
      <div className="weather-container">
        <div className="header">{cityName}</div>
        <div className="inner-container">
          <div className="image">
            <img
              src={`https://www.weatherbit.io/static/img/icons/${weather_icons}.png`}
            ></img>
          </div>
          <div className="current-weather">{temperature}°</div>
        </div>
        <div className="footer">{weather_descriptions}</div>
      </div>
    );
  }
}
