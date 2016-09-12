import React, { Component } from 'react';
import { Link } from 'react-router';
import './Main.css';


class Main extends Component {
  render() {
    return (
      <div className='page'>
        <ul className='links'>
          <li><Link to='/examples'>Examples</Link></li>
          <li><a href='https://github.com/jquense/react-formal'>Github</a></li>
        </ul>
        <div className='content'>
          {'Here will be some "getting-started"/"general"/"links"/etc information'}
        </div>
      </div>
    );
  }
}

export default Main;
