import React, { Component } from "react";
import InputForm from "./components/Note/InputForm";
import ResultForm from "./components/Note/ResultForm";
import axios from "axios";
import { DateTime, Interval } from "luxon";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      submitted: false,
      intervalLength: undefined,
      sleepStart: {
        time: undefined
      },
      sleepEnd: {
        time: undefined
      }
    };
  }
  calcSleep(departTime, arriveTime, hours) {
    console.log("in calc Sleep");
    departTime = DateTime.fromISO(departTime);
    arriveTime = DateTime.fromISO(arriveTime);
    console.log("departTime ", departTime);
    let departDst = departTime.setZone(arriveTime.zone);
    console.log("departDst ", departDst); // Depart time in destination timezone

    console.log("hours ", hours);
    let sleepArr = Array();
    console.log("Hours below");
    console.log(hours);
    for (let i = 0; i < hours; i++) {
      const startSleep = 22; // Hour where you should start to sleep
      const endSleep = 7; // Hour where you should stop sleeping

      // Yes, I know how hacky this is, but I don't know enough JS
      let startInt = departDst.plus({ hours: i });
      let endInt;

      if (startInt.hour >= startSleep || startInt.hour <= endSleep) {
        for (; i < hours; i++) {
          endInt = departDst.plus({ hour: i });

          if (!(startInt.hour >= startSleep || startInt.hour <= endSleep)) {
            break;
          }
        }
        sleepArr.push(Interval.fromDateTimes(startInt, endInt));
      }
    }

    return sleepArr;
  }

  getSleepTimes(response, flightNumber) {
    let indexOfFlight;
    for (var i = 0; i < response.data.length; i++) {
      if (response.data[i].flightNumber == flightNumber) {
        indexOfFlight = i;
        break;
      }
    }
    console.log(indexOfFlight);
    if (indexOfFlight !== undefined) {
      let departureTime = response.data[indexOfFlight].departureTime;
      let arrivalTime = response.data[indexOfFlight].arrivalTime;
      let totalTimeHours = response.data[indexOfFlight].duration.hours;
      console.log(departureTime);
      let intervals = this.calcSleep(
        departureTime,
        arrivalTime,
        totalTimeHours
      );
      return intervals;
    }
  }

  onSubmitHandler = e => {
    console.log("hello to the me");
    let flightNumber = e.flightNumber;
    let dateVal = e.date;
    axios
      .get("http://localhost:3030/flights?date=2020-01-01") // endpoint for
      .then(response => {
        let intervals = this.getSleepTimes(response, flightNumber);
        console.log(intervals);

        if (intervals !== undefined && intervals.length) {
          this.setState({
            submitted: true,
            intervalLength: intervals.length,
            sleepStart: {
              time: intervals[0].start.toFormat("DD HH:mm")
            },
            sleepEnd: {
              time: intervals[0].end.toFormat("DD HH:mm")
            }
          });
        }
        this.setState({
          submitted: true
        });
      });
  };

  render() {
    return (
      <React.Fragment>
        <div className="notesWrapper">
          <div className="notesHeader">Rejuven8</div>
          <div className="container">
            <InputForm onSubmit={this.onSubmitHandler} />
          </div>
          <div className="container">
            <ResultForm appState={this.state} />
          </div>

          <div className="notesBody"></div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
