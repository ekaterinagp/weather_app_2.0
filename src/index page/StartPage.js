import React from "react";
import "./css/style.css";
// import axios from "axios";
import CurrentWeather from "./CurrentWeather";

export default class StartPage extends React.Component {
  render() {
    return (
      <div className="app-container">
        <CurrentWeather
          cityName={this.props.cityName}
          temperature={this.props.temperature}
          weather_descriptions={this.props.weather_descriptions}
          weather_icons={this.props.weather_icons}
          onSelectCity={this.onSelectCity}
        />
      </div>
    );
  }
}
