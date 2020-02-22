import React from "react";
import "./style.css";

export default class Forecast extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: undefined
    };
  }

  render() {
    return (
      <div>
        <h1>Forecast Page {this.state.cityName} </h1>
      </div>
    );
  }
}
