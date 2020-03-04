import React from "react";
import "./style.css";
import axios from "axios";
// import Spinner from "../components/Spinner";
import { FaUmbrellaBeach } from "react-icons/fa";

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
        let gotAlerts = data.alerts.map(alert => {
          return alert;
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
      <div className="mainAlertDiv">
        <h1 className="alertTitle">{this.state.cityName}: weather alerts</h1>

        {this.state.alerts.length ? (
          <div className="alertDesc">
            {this.state.alerts.map((alert, i) => (
              <div className="singleAlert" key={i}>
                <h1>{alert.title}</h1>
                <p>{alert.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="noAlerts">
            {" "}
            No weather alerts at the moment <FaUmbrellaBeach />
          </div>
        )}
      </div>
    );
  }
}
