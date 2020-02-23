import React from "react";
import "./css/style.css";
// import axios from "axios";
import TopSection from "./components/top/index";

export default class StartPage extends React.Component {
  onCityNameChange(e) {
    this.setState({ cityName: e.target.value });
    console.log(e.target.value);
  }

  onSelectCity() {
    // const { cityName } = this.state;
    this.props.setParentState(this.state);
    this.props.setUpdateFromChild();

    console.log("in select", this.state);
  }

  render() {
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
        </div>
      </div>
    );
  }
}
