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
      weather_icons
    } = this.props;
    return (
      <div>
        <h2 className="header">{cityName}</h2>
        <div className="inner-container">
          <div className="image">
            {weather_icons && (
              <img
                alt="bla"
                src={`https://www.weatherbit.io/static/img/icons/${weather_icons}.png`}
              ></img>
            )}
          </div>
          <p className="current-weather">{temperature}°</p>
        </div>
        <p className="footer">{weather_descriptions}</p>
      </div>
    );
  }
}
