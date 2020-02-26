import React from "react";
import "./css/style.css";
// import Weather from "./weather";

export default class TopSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      cityName,
      temperature,
      weather_descriptions,
      weather_icons
    } = this.props;
    return (
      <div className="top-container">
        <div className="title">Soft Weather</div>

        <div className="weather-container">
          <div className="header">{cityName}</div>
          <div className="inner-container">
            <div className="image">
              {weather_icons && (
                <img
                  alt="bla"
                  src={`https://www.weatherbit.io/static/img/icons/${weather_icons}.png`}
                ></img>
              )}
            </div>
            <div className="current-weather">{temperature}°</div>
          </div>
          <div className="footer">{weather_descriptions}</div>
        </div>
      </div>
    );
  }
}
