import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./index page/css/style.css";
import axios from "axios";

import WeatherAlert from "./weather_alert/Alert";
import Forecast from "./forecast/Forecast";

// import TopSection from "./index page/components/top/index";
// import BottomSection from "./index page/components/bottom/index";
import StartPage from "./index page";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: "Copenhagen",
      isLoading: true,
      temperature: undefined,
      weather_descriptions: undefined,
      weather_icons: null
    };
    this.updateWeather = this.updateWeather.bind(this);
  }

  setStateFromChild = childData => {
    this.setState(childData);
  };

  // onCityChange = cityName => {
  //   console.log(cityName);
  //   this.setState({ cityName: cityName });
  // };

  updateWeather() {
    console.log("we are in update in parent");
    console.log(this.state);

    const weather_key = "45fad47371d541f289461204ee6a8069";
    const { cityName } = this.state;
    const URL = `https://api.weatherbit.io/v2.0/current?city=${cityName}&key=${weather_key}`;

    axios
      .get(URL)
      .then(res => {
        return res.data;
      })
      .then(data => {
        console.log({ data });
        console.log(this.state);
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

  // onCityNameChange(e) {
  //   this.setState({ cityName: e.target.value });
  //   console.log(e.target.value);
  // }

  // onSelectCity() {
  //   const { cityName } = this.state;
  //   this.updateWeather();
  //   console.log("inselect", this.state);
  // }

  render() {
    // const {
    //   isLoading,
    //   cityName,
    //   temperature,
    //   weather_descriptions,
    //   weather_icons
    // } = this.state;

    return (
      <div>
        <Router>
          <div className="menuDiv">
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/forecast">Forecast</Link>
                </li>
                <li>
                  <Link to="/weather-alert">Weather alert</Link>
                </li>
              </ul>
            </nav>

            <Switch>
              <Route
                path="/forecast"
                component={props => <Forecast {...props} />}
              />
              <Route
                path="/weather-alert"
                component={props => <WeatherAlert {...props} />}
              />
              <Route
                exact
                path="/"
                component={props => (
                  <StartPage
                    {...this.state}
                    setParentState={this.setStateFromChild}
                    setUpdateFromChild={this.updateWeather}
                  />
                )}
              />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
