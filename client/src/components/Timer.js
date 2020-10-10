import React, { Component } from "react";
import "./Timer.css";

class Timer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      minutes: 30,
      seconds: 0,
    };
    this.startTimer = this.startTimer.bind(this);
    this.setTimer = this.setTimer.bind(this);
  }

  startTimer() {
    this.myInterval = setInterval(() => {
      const { seconds, minutes } = this.state;

      if (seconds > 0) {
        this.setState(({ seconds }) => ({
          seconds: seconds - 1,
        }));
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(this.myInterval);
        } else {
          this.setState(({ minutes }) => ({
            minutes: minutes - 1,
            seconds: 59,
          }));
        }
      }
    }, 1000);
  }

  setTimer(event) {
    this.setState({
      minutes: event.target.value,
    });
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

  render() {
    const { minutes, seconds } = this.state;
    return (
      <div>
        <div
          className={this.props.theme === "Terminal" ? "time" : "time-plain"}
        >
          {minutes === 0 && seconds === 0 ? (
            <h1>Busted!</h1>
          ) : (
            <h1>
              Time Remaining: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </h1>
          )}
        </div>
        <div className="outer-div">
          <div className="t">
            <input
              onChange={this.setTimer.bind(this)}
              placeholder="Set Time"
            ></input>
          </div>
          <button className="timer-btn" onClick={this.startTimer}>
            Start
          </button>
        </div>
      </div>
    );
  }
}

export default Timer;
