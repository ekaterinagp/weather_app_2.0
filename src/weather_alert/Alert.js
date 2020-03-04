import React from "react";
import "./style.css";
import axios from "axios";
import Spinner from "../components/Spinner";

export default class WeatherAlert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: this.props.cityName,
      alerts: []
    };
  }

  _isMounted = false;

  fetchWeatherAlert() {
    const weather_key = "45fad47371d541f289461204ee6a8069";
    const { cityName } = this.state;
    const URL = ` https://api.weatherbit.io/v2.0/alerts?city=${cityName}&key=${weather_key}`;

    axios
      .get(URL)
      .then(res => {
        console.log(res);
        return res.data;
      })
      .then(data => {
        console.log({ data });
        let gotAlerts = [];

        data.alerts.forEach(alert => {
          gotAlerts.push(alert);
        });
        if (this._isMounted) {
          if (gotAlerts.length) {
            this.setState({
              alerts: gotAlerts
            });
            console.log(this.state);
          } else {
            console.log("there are no alerts");
          }
        }
      })

      .catch(err => {
        if (err) console.error("Cannot fetch Weather Data from API, ", err);
      });
  }

  componentDidMount() {
    this._isMounted = true;
    this.fetchWeatherAlert();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <div
        className="mainAlertDiv"
        style={{
          color: this.props.dayTime === false ? "white" : "#404040"
        }}
      >
        <h1
          style={{
            color: this.props.dayTime === false ? "white" : "#404040"
          }}
          className="alertTitle"
        >
          ALERT! For {this.state.cityName}
        </h1>
        {this.props.isLoading ? (
          <Spinner />
        ) : (
          <div className="alertDesc">
            {this.state.alerts.map((alert, i) => (
              <div className="singleAlert" key={i}>
                <h1
                  style={{
                    color: this.props.dayTime === false ? "white" : "#404040"
                  }}
                >
                  {alert.title}
                </h1>
                <p>{alert.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}
