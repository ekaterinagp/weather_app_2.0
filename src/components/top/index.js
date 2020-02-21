import React from "react";
import "./style.css";
import Weather from "./weather";

export default class TopSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="top-container">
        <div className="title">Soft Weather</div>

        <Weather {...this.props} />
        <div className="divButton">
          {/* <label htmlFor="location-name">Location Name</label> */}
          <input
            id="location-name"
            type="text"
            placeholder="City Name"
            // onChange={this.onLocationNameChange.bind(this)}
          />
          <button className="btn btn-select-location">Select</button>
        </div>
      </div>
    );
  }
}
