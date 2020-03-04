import React from "react";
import "./css/style.css";
// import axios from "axios";
import CurrentWeather from "./CurrentWeather";
import Spinner from "../components/Spinner";

export default class StartPage extends React.Component {
  render() {
    return (
      <div className="app-container">
        {this.props.isLoading ? (
          <Spinner />
        ) : (
          <CurrentWeather
            cityName={this.props.cityName}
            temperature={this.props.temperature}
            weather_descriptions={this.props.weather_descriptions}
            weather_icons={this.props.weather_icons}
            pres={this.props.pres}
            wind_spd={this.props.wind_spd}
            wind_cdir_full={this.props.wind_cdir_full}
            uv={this.props.uv}
            sunset={this.props.sunset}
            sunrise={this.props.sunrise}
            rh={this.props.rh}
            clouds={this.props.clouds}
            app_temp={this.props.app_temp}
            vis={this.props.vis}
            onSelectCity={this.onSelectCity}
            dayTime={this.props.dayTime}
          />
        )}
      </div>
    );
  }
}
