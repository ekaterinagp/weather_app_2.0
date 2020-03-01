import React from "react";
import "./style.css";
import { FaLocationArrow } from "react-icons/fa";
import axios from "axios";
// import { debounce } from "throttle-debounce";

class Debouncer {
  running = false;
  call = (timer, fn) => {
    // console.log("debouncer called", timer);
    if (this.running) {
      // console.log("debouncer running, cancel");
      return;
    }
    this.running = true;
    setTimeout(() => {
      fn();
      this.running = false;
    }, timer);
  };
}

export default class SearchCity extends React.Component {
  debouncer = new Debouncer();

  setSearchTerm = e => {
    e.persist();
    this.debouncer.call(2000, () => {
      console.log("value :: ", e.target.value);
      const searchWord = e.target.value;
      const URL = `https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json?apiKey=gb1pDbEVM5lcWFB5PASfRt9FeZR4z2VxyEybpvfye9s&query=${searchWord}`;

      axios
        .get(URL)
        .then(res => {
          return res.data;
        })
        .then(data => {
          console.log({ data }, { URL });
          if (data.suggestions) {
            console.log("there are suggections");
            this.props.autoComplete(data.suggestions);
          } else {
            return;
          }
        })
        .catch(err => {
          if (err) console.error("Cannot fetch Weather Data from API, ", err);
        });
    });
  };

  onCityNameChange(e) {
    this.setState({ cityName: e.target.value });
    console.log(e.target.value);
  }

  onSelectCity() {
    this.props.setParentState(this.state);
    this.props.setUpdateFromChild();

    console.log("in select", this.state);
  }
  render() {
    return (
      <div className="divButton">
        <div>
          {" "}
          <FaLocationArrow />
          <input
            id="location-name"
            type="text"
            placeholder="City Name"
            onBlur={this.onCityNameChange.bind(this)}
            onKeyUp={this.setSearchTerm}
            autoComplete="off"
          />
          <button
            className="btn btn-select-location"
            onClick={this.onSelectCity.bind(this)}
          >
            Select
          </button>
        </div>
        <h1 className="title">Soft Weather</h1>
      </div>
    );
  }
}
