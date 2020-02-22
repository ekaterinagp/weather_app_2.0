import React from "react";
import "./css/style.css";
import axios from "axios";
import TopSection from "./components/top/index";
import BottomSection from "./components/bottom/index";

export default class StartPage extends React.Component {
  // sendDataToParent = () => {};

  updateWeather({ cityName }) {
    console.log("we try update");
    const weather_key = "45fad47371d541f289461204ee6a8069";
    // const { cityName } = this.state;
    const URL = `https://api.weatherbit.io/v2.0/current?city=${cityName}&key=${weather_key}`;
    axios
      .get(URL)
      .then(res => {
        console.log(res);
        return res.data.data[0];
      })
      .then(data => {
        console.log(data);

        this.setState({
          temperature: data.temp,
          weather_descriptions: data.weather.description,
          weather_icons: data.weather.icon
        });
        this.props.setParentState(this.state);
      })
      .catch(err => {
        if (err) console.error("Cannot fetch Weather Data from API, ", err);
      });
  }

  // componentDidMount() {
  //   this.updateWeather();
  // }

  onCityNameChange(e) {
    this.setState({ cityName: e.target.value });
    console.log(e.target.value);
  }

  onSelectCity() {
    const { cityName } = this.state;
    this.updateWeather({ cityName });
    // this.props.propFromParent(cityName);
    console.log("in select", this.state);
  }

  render() {
    // const {
    //   isLoading,
    //   cityName,
    //   temperature,
    //   weather_descriptions,
    //   weather_icons
    // } = this.state;

    return (
      <div className="app-container">
        <div className="main-container">
          {/* {isLoading && <h3>Loading weather...</h3>} */}
          {/* {!isLoading && ( */}
          <div className="top-section">
            <TopSection
              cityName={this.props.cityName}
              temperature={this.props.temperature}
              weather_descriptions={this.props.weather_descriptions}
              weather_icons={this.props.weather_icons}
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
          {/* // )} */}
          <div className="bottom-section">
            <BottomSection />
          </div>
        </div>
      </div>
    );
  }
}
