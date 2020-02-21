import React from "react";
import "./style.css";
import Weather from "./weather";

export default class TopSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // const { eventEmitter } = this.props;
    return (
      <div className="top-container">
        <div className="title">Soft Weather</div>

        <Weather {...this.props} />
      </div>
    );
  }
}
