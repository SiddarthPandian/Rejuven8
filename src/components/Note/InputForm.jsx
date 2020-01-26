import React, { Component } from "react";
import "./InputForm.css";

class InputForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      flightNumber: "",
      date: ""
    };
  }

  onFlightNumberChange = e => {
    console.log(e.target.value);
    this.setState({
      flightNumber: e.target.value
    });
  };

  onDateChange = e => {
    this.setState({
      date: e.target.value
    });
  };

  onSubmitClick = () => {
    this.props.onSubmit(this.state);
  };

  render() {
    return (
      <div className="txtFormat">
        <p>This will tell you when to sleep</p>
        <div className="inlineBlock">
          <div id="widthChange" className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-default">
                Flight #
              </span>
            </div>
            <input onChange={this.onFlightNumberChange}></input>
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-default">
                Date
              </span>
            </div>
            <input type="date" onChange={this.onDateChange}></input>
          </div>
          <button className="btn btn-dark btn-sm" onClick={this.onSubmitClick}>
            Submit
          </button>
        </div>
      </div>
    );
  }
}

export default InputForm;
