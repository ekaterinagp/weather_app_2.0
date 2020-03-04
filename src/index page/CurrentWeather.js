import React from "react";
import "./css/style.css";
// import Weather from "./weather";
import { GiSunrise } from "react-icons/gi";
import { GiSunset } from "react-icons/gi";

export default class CurrentWeather extends React.Component {
  render() {
    const styles = {
      divNight: {
        // color: "white",
        // background:
        //   "linear-gradient(90deg, rgba(90,121,162,0.4853291658460259) 0%, rgba(49,49,124,0.7234244039412641) 40%, rgba(0,65,255,0.4433123591233369) 100%)"
        backgroundColor: "#9b9bc3"
      },
      divDay: {
        color: "#404040"
        // background:
        //   "radial-gradient(circle, rgba(168,167,192,0.4853291658460259) 0%, rgba(195,204,186,0.7234244039412641) 40%, rgba(228,255,0,0.4433123591233369) 100%)"
      }
    };
    const {
      cityName,
      temperature,
      weather_descriptions,
      weather_icons,
      pres,
      wind_spd,
      wind_cdir_full,
      uv,
      sunset,
      sunrise,
      clouds,
      rh,
      dayTime,
      vis,
      app_temp
    } = this.props;
    console.log(this.props);
    return (
      <div className="currentWeather">
        <div
          className="mainInfo"
          style={dayTime === false ? styles.divNight : styles.divDay}
        >
          <h2
            className="header"
            // style={{
            //   color: dayTime === false ? "white" : "#404040"
            // }}
          >
            {cityName}
          </h2>
          {/* <div className="inner-container"> */}
          <div className="image">
            {weather_icons && (
              <img
                alt="bla"
                src={`https://www.weatherbit.io/static/img/icons/${weather_icons}.png`}
              ></img>
            )}
          </div>
          <p className="current-weather">{temperature}°</p>
          <p>Feels like {app_temp}°</p>
          {/* </div> */}
          <p className="footer">{weather_descriptions}</p>
        </div>
        <div
          className="additionalInfo"
          style={dayTime === false ? styles.divNight : styles.divDay}
        >
          <div className="title">Pressure</div>
          <div className="value">{pres} Pa</div>

          <div className="title">UV Index</div>
          <div className="value">{uv} UV</div>

          <div className="title">
            <GiSunrise />
          </div>
          <div className="value">{sunrise}</div>

          <div className="title">
            <GiSunset />
          </div>
          <div className="value">{sunset}</div>

          <div className="title">Wind</div>
          <div className="value">
            {wind_spd} m/s {wind_cdir_full}
          </div>

          <div className="title">Humidity</div>
          <div className="value">{rh}%</div>

          <div className="title">Cloud coverage</div>
          <div className="value">{clouds}%</div>

          <div className="title">Visibility</div>
          <div className="value">{vis} km</div>
        </div>
      </div>
    );
  }
}
