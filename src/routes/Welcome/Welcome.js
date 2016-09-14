import React, { Component } from 'react';
import { Link } from 'react-router';
import './Welcome.css';


class Main extends Component {
  render() {
    return (
      <div className='page'>
        <div className='links'>
          <Link to='/examples'>Examples</Link>
          <a href='https://github.com/jquense/react-formal'>Github</a>
        </div>
        <div className='content'>
          {'Here will be some "getting-started"/"general"/"links"/etc information'}
        </div>
      </div>
    );
  }
}

export default Main;
