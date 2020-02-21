import React from "react";

import "./css/style.css";
import axios from "axios";

import TopSection from "./components/top/index";
import BottomSection from "./components/bottom/index";

const weather_key = "45fad47371d541f289461204ee6a8069";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: "Petrozavodsk",
      isLoading: true
    };
  }

  componentDidMount() {
    const { cityName } = this.state;
    const URL = `https://api.weatherbit.io/v2.0/current?city=${cityName}&key=${weather_key}`;

    axios
      .get(URL)
      .then(res => {
        return res.data;
      })
      .then(data => {
        console.log(data);
        this.setState({
          isLoading: false,
          temperature: data.data[0].temp,
          weather_descriptions: data.data[0].weather.description,
          weather_icons: data.data[0].weather.icon
        });
      })
      .catch(err => {
        if (err) console.error("Cannot fetch data from API, ", err);
      });
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
              />
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
