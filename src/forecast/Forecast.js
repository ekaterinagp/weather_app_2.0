import React from "react";
import "./style.css";
import axios from "axios";
import Spinner from "../components/Spinner";

export default class Forecast extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: this.props.cityName,
      days: []
    };
  }

  fetchWeatherForecast = () => {
    const weather_key = "45fad47371d541f289461204ee6a8069";
    const { cityName } = this.state;
    const URL = `http://api.weatherbit.io/v2.0/forecast/daily?city=${cityName}&key=${weather_key}`;

    axios
      .get(URL)
      .then(res => {
        console.log(res);
        return res.data;
      })
      .then(data => {
        console.log({ data });

        // let allDays = data.data;
        // console.log(allDays);
        let allDays = data.data.map(day => {
          let newDay = {
            temperature: day.temp,
            date: day.datetime,
            weather_description: day.weather.description,
            weather_icon: day.weather.icon,
            low_temp: day.low_temp,
            max_temp: day.max_temp
          };

          return newDay;
        });
        console.log(allDays);
        this.setState({
          days: allDays
        });
        console.log(this.state);
      })
      .catch(err => {
        if (err) console.error("Cannot fetch Weather Data from API, ", err);
      });
  };

  componentDidMount() {
    this.fetchWeatherForecast();
  }

  render() {
    console.log(this.state);
    return (
      <div
        style={{
          color: this.props.dayTime === false ? "white" : "#404040"
        }}
      >
        <div className="forecastTitle">
          <h1
            style={{
              color: this.props.dayTime === false ? "white" : "#404040"
            }}
          >
            Forecast Page {this.state.cityName}{" "}
          </h1>
        </div>
        {this.props.isLoading ? (
          <Spinner />
        ) : (
          <div className="daysForecast">
            {this.state.days.map((day, i) => (
              <div className="eachDay" key={i}>
                <h2
                  style={{
                    color: this.props.dayTime === false ? "white" : "#404040"
                  }}
                >
                  {i === 0 ? "today" : i === 1 ? "tomorrow" : day.date}
                </h2>
                <h3>{day.temperature}</h3>
                <img
                  alt="bla"
                  src={`https://www.weatherbit.io/static/img/icons/${day.weather_icon}.png`}
                ></img>
                <li>{day.weather_description}</li>
                <li>Highest temperature: {day.max_temp}</li>
                <li>Lowest temperature: {day.low_temp}</li>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}
