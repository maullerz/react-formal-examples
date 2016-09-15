import React, { Component } from 'react';
import { Link } from 'react-router';

import './App.css';


export default class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <Link to='/' className='no-underline'>
            <h2>React-Formal Examples</h2>
          </Link>
          <a href='https://github.com/maullerz/react-formal-example'>
            <h3>Github</h3>
          </a>
        </div>
        <div className="App-intro">
          {this.props.children}
        </div>
      </div>
    );
  }
}
