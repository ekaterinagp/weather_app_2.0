import React from "react";

import "./css/style.css";
import axios from "axios";

import TopSection from "./index page/components/top/index";
import BottomSection from "./index page/components/bottom/index";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: "Saint Petersburg",
      isLoading: true
    };
  }

  updateWeather() {
    const weather_key = "45fad47371d541f289461204ee6a8069";
    const { cityName } = this.state;
    const URL = `https://api.weatherbit.io/v2.0/current?city=${cityName}&key=${weather_key}`;
    axios
      .get(URL)
      .then(res => {
        return res.data;
      })
      .then(data => {
        this.setState({
          isLoading: false,
          temperature: data.data[0].temp,
          weather_descriptions: data.data[0].weather.description,
          weather_icons: data.data[0].weather.icon
        });
      })
      .catch(err => {
        if (err) console.error("Cannot fetch Weather Data from API, ", err);
      });
  }

  componentDidMount() {
    this.updateWeather();
  }

  onCityNameChange(e) {
    this.setState({ cityName: e.target.value });
    console.log(e.target.value);
  }

  onSelectCity() {
    const { cityName } = this.state;
    this.updateWeather();
    console.log("inselect", this.state);
  }

  render() {
    const {
      isLoading,
      cityName,
      temperature,
      weather_descriptions,
      weather_icons
    } = this.state;

    return (
      <div className="app-container">
        <div className="main-container">
          {isLoading && <h3>Loading weather...</h3>}
          {!isLoading && (
            <div className="top-section">
              <TopSection
                cityName={cityName}
                temperature={temperature}
                weather_descriptions={weather_descriptions}
                weather_icons={weather_icons}
                onSelectCity={this.onSelectCity}
              />
              <div className="divButton">
                {/* <label htmlFor="location-name">Location Name</label> */}
                <input
                  id="location-name"
                  type="text"
                  placeholder="City Name"
                  onBlur={this.onCityNameChange.bind(this)}
                />
                <button
                  className="btn btn-select-location"
                  onClick={this.onSelectCity.bind(this)}
                >
                  Select
                </button>
              </div>
            </div>
          )}
          <div className="bottom-section">
            <BottomSection />
          </div>
        </div>
      </div>
    );
  }
}
