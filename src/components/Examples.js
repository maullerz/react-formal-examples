import React, { Component } from 'react';
import { Link } from 'react-router';
// import './Examples.css';

class Examples extends Component {
  render() {
    return (
      <div className='page'>
        <ul className='links'>
          <li><Link to='/examples/auth'>Auth</Link></li>
          <li><Link to='/examples/validations'>Validations</Link></li>
        </ul>
        <div className='content'>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Examples;
