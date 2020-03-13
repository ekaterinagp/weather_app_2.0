import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "./index page/css/style.css";
import axios from "axios";
import { FaHome } from "react-icons/fa";
import { WiDaySnowWind } from "react-icons/wi";
import { GoAlert } from "react-icons/go";
import SearchCity from "./components/SearchCity";
import WeatherAlert from "./weather_alert/Alert";
import Forecast from "./forecast/Forecast";
import StartPage from "./index page/StartPage";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: "Trondheim",
      isLoading: true,
      temperature: undefined,
      weather_descriptions: undefined,
      weather_icons: null,
      pres: null,
      wind_spd: null,
      wind_cdir_full: undefined,
      uv: null,
      sunset: undefined,
      sunrise: undefined,
      rh: null,
      clouds: undefined,
      app_temp: undefined,
      vis: undefined,
      suggestions: [],
      resultsHidden: true,
      now: new Date(),
      dayTime: true,
      inputValue: "Trondheim"
    };
  }

  componentDidMount() {
    this.updateWeather();
    console.log(this.state.now);
  }

  getIfDayOrNight = () => {
    let h = this.state.now.getHours();
    let sunsetHours = parseInt(this.state.sunset);
    let sunriseHours = parseInt(this.state.sunrise);
    if (h > sunsetHours || h < sunriseHours) {
      this.setState({
        dayTime: false
      });
    } else {
      this.setState({
        dayTime: true
      });
    }
  };

  updateWeather = () => {
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
          weather_icons: data.data[0].weather.icon,
          pres: data.data[0].pres,
          wind_spd: Math.floor(data.data[0].wind_spd),
          wind_cdir_full: data.data[0].wind_cdir_full,
          sunset: data.data[0].sunset,
          sunrise: data.data[0].sunrise,
          uv: data.data[0].uv,
          rh: data.data[0].rh,
          clouds: data.data[0].clouds,
          vis: data.data[0].vis,
          app_temp: data.data[0].app_temp
        });
        console.log(this.state.rh);
        this.getIfDayOrNight();
      })
      .catch(err => {
        if (err) console.error("Cannot fetch Weather Data from API, ", err);
      });
  };

  toggle() {
    this.setState({ resultsHidden: !this.state.resultsHidden });
  }

  setStateFromChild = async childData => {
    await this.setState(childData);
    return;
  };

  onClickChoose = async e => {
    console.log("target", e.currentTarget.dataset.id);
    await this.setState({
      cityName: e.currentTarget.dataset.id
    });
    console.log(this.state.cityName);
    this.updateWeather();
  };

  handelAutoComplete = async dataFromChild => {
    console.log("passing to parents", dataFromChild);
    let newSuggestions = dataFromChild
      .filter(city => city.address.city)
      .filter(city => city.matchLevel === "city");
    console.log("newArraycheck", newSuggestions);
    await this.setState({
      suggestions: newSuggestions
    });
    console.log("checking suggestions", this.state.suggestions);
    if (this.state.suggestions.length) {
      await this.setState({
        resultsHidden: false
      });
      this.Results();
    }
  };

  Results = () => {
    let resultClass = ["results"];
    if (this.state.resultsHidden) {
      resultClass.push("hide");
    }
    return (
      <div className={resultClass.join(" ")} onClick={this.toggle.bind(this)}>
        {this.state.suggestions.map((oneSuggestion, i) => (
          <p
            key={i}
            onClick={this.onClickChoose}
            data-id={oneSuggestion.address.city}
          >
            {oneSuggestion.address.city ? oneSuggestion.address.city : ""},{" "}
            {oneSuggestion.address.city ? oneSuggestion.address.country : ""},{" "}
            {oneSuggestion.address.postalCode}
          </p>
        ))}
      </div>
    );
  };

  render() {
    return (
      <div className="mainWrapper">
        <SearchCity
          {...this.state}
          setParentState={this.setStateFromChild}
          setUpdateFromChild={this.updateWeather}
          autoComplete={this.handelAutoComplete}
        />

        <this.Results />

        <div className="wrapper">
          <Router basename={"/"}>
            <div className="menuDiv">
              <nav>
                <ul>
                  <li className="liMenu a">
                    <NavLink
                      exact
                      to={`${process.env.PUBLIC_URL}/`}
                      activeClassName="selectedLink"
                    >
                      <FaHome /> Home
                    </NavLink>
                  </li>
                  <li className="liMenu b">
                    <NavLink
                      to={`${process.env.PUBLIC_URL}/forecast`}
                      activeClassName="selectedLink"
                    >
                      <WiDaySnowWind /> Forecast
                    </NavLink>
                  </li>
                  <li className="liMenu c">
                    <NavLink
                      to={`${process.env.PUBLIC_URL}/weather-alert`}
                      activeClassName="selectedLink"
                    >
                      <GoAlert /> Weather alert
                    </NavLink>
                  </li>
                </ul>
              </nav>
            </div>
            <Switch>
              <Route
                path={`${process.env.PUBLIC_URL}/forecast`}
                component={state => <Forecast {...this.state} />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/weather-alert`}
                component={state => <WeatherAlert {...this.state} />}
              />
              <Route
                exact
                path={`${process.env.PUBLIC_URL}/`}
                component={props => (
                  <StartPage {...this.state} isLoading={this.state.isLoading} />
                )}
              />
            </Switch>
          </Router>
        </div>
      </div>
    );
  }
}
