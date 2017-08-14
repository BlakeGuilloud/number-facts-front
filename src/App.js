import React, { Component } from 'react';
import './App.css';
import * as Actions from './actions';

class App extends Component {
  static initialState = {
    number: '',
    name: '',
    errorFeedback: false,
  };

  state = {
    ...App.initialState,
    successFeedback: false,
  };

  resetState = () => {
    this.setState({
      ...App.initialState,
      successFeedback: true,
    });
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

  handleSubmit = (e) => {
    e.preventDefault();

    if (!this.state.name || !this.state.number) {
      this.setState({
        errorFeedback: true,
        successFeedback: false,
      });
    } else {
      const payload = {
        name: this.state.name,
        number: this.stripAndShapePhone(this.state.number),
      };
  
      Actions.register(payload)
        .then(this.resetState);
    }
  }

  render() {
    const renderAlertSuccess = () => this.state.successFeedback &&
      <div className="alert alert-success" role="alert">
        Thanks for subscribing!
      </div>;
    const renderAlertError = () => this.state.errorFeedback &&
      <div className="alert alert-danger" role="alert">
        Please fill out both fields.
      </div>;

    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to Number Facts</h2>
          <p>Enter your phone number below and receive a text message every morning with a random trivia fact.</p>
          <p>To have your number removed, contact blake.guilloud@gmail.com</p>
        </div>
        <div className="App-content">
          <form className="col-md-4 col-md-offset-4 col-xs-10 col-xs-offset-1">
            {renderAlertSuccess()}
            {renderAlertError()}
            <div className="form-group">
              <input
                className="form-control"
                value={this.state.name}
                placeholder="Name"
                onChange={e => this.handleChange('name', e.currentTarget.value)}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                value={this.state.number}
                placeholder="Number"
                onChange={e => this.handleChange('number', e.currentTarget.value)}
              />
            </div>
            <button onClick={this.handleSubmit} type="submit" className="btn btn-primary btn-block">
              Register
            </button>
          </form>
        </div>
        <div className="App-footer">
          F. Blake Guilloud | 2017
        </div>
      </div>
    );
  }
}

export default App;
