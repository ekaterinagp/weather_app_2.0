import React from "react";

export default class Debouncer extends React.Component {
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
