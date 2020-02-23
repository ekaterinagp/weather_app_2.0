import React from "react";
import "./style.css";
import axios from "axios";

export default class Forecast extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: this.props.cityName,
      days: []
      // temperature: undefined,
      // weather_description: undefined,
      // weather_icons: null
    };
    this.fetchWeatherForecast = this.fetchWeatherForecast.bind(this);
  }

  fetchWeatherForecast() {
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
        let allDays = [];

        data.data.forEach(day => {
          let newDay = {
            temperature: day.temp,
            date: day.datetime,
            weather_description: day.weather.description,
            weather_icon: day.weather.icon,
            low_temp: day.low_temp,
            max_temp: day.max_temp
          };
          allDays.push(newDay);
          console.log(allDays);
        });
        this.setState({
          days: allDays
        });
        console.log(this.state);
      })
      .catch(err => {
        if (err) console.error("Cannot fetch Weather Data from API, ", err);
      });
  }

  componentDidMount() {
    this.fetchWeatherForecast();
  }

  render() {
    console.log(this.state);
    return (
      <div>
        {/* <h1>Forecast Page {this.state.days[1].weather_description} </h1> */}
        <div>
          {this.state &&
            this.state.days &&
            this.state.days.length &&
            this.state.days.map(day => <li>{day.max_temp}</li>)}
        </div>
      </div>
    );
  }
}
