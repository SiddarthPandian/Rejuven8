import React, { Component } from "react";
import "./ResultForm.css";

class ResultForm extends Component {
  render() {
    const {
      submitted,
      intervalLength,
      sleepStart,
      sleepEnd
    } = this.props.appState;
    return (
      <div>
        {intervalLength && intervalLength > 0 && (
          <div className="resultFormat">
            It is recommended to sleep from {sleepStart.time} to {sleepEnd.time}
          </div>
        )}
        {submitted && intervalLength === undefined && (
          <div className="resultFormat">Invalid flight info</div>
        )}
        {typeof intervalLength !== undefined && intervalLength === 0 && (
          <div className="resultFormat">
            There is no need to alter your sleep schedule
          </div>
        )}
      </div>
    );
  }
}

export default ResultForm;
