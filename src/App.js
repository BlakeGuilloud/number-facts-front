import React, { Component } from 'react';
import './App.css';
import * as Actions from './actions';

class App extends Component {
  static initialState = {
    number: '',
    name: '',
  };

  state = App.initialState;

  resetState = () => {
    this.setState(App.initialState);
  }

  handleChange = (name, value) => {
    this.setState({
      [name]: value,
    });
  }


  stripAndShapePhone = (phoneNumber) => {
    let formattedNumber = phoneNumber.replace(/[^0-9]/g, '');

    if (formattedNumber[0] === '1') {
      formattedNumber = `+${formattedNumber}`;
    } else {
      formattedNumber = `+1${formattedNumber}`;
    }

    return formattedNumber;
  }

  handleSubmit = () => {
    const payload = {
      name: this.state.name,
      number: this.stripAndShapePhone(this.state.number),
    };

    Actions.register(payload)
      .then(this.resetState);
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to Number Facts</h2>
          <p>Enter your phone number below and receive a text message every morning with a random trivia fact.</p>
          <p>At this time, registration is permanent.</p>
          <p>To have your number removed, contact blake.guilloud@gmail.com</p>
        </div>
        <p className="App-intro">
          <div>
            <input
              value={this.state.name}
              placeholder="Your Name"
              onChange={(e) => this.handleChange('name', e.currentTarget.value)}
            />
          </div>
          <div>
            <input
              value={this.state.number}
              placeholder="Your Number"
              onChange={(e) => this.handleChange('number', e.currentTarget.value)}
            />
          </div>
          <button onClick={this.handleSubmit}>
            Register
          </button>
        </p>
      </div>
    );
  }
}

export default App;
