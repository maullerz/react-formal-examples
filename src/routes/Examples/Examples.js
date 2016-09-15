import React, { Component } from 'react';
import { Link } from 'react-router';

import './Examples.css';


class Examples extends Component {
  render() {
    return (
      <div className='page'>
        <div className='links'>
          <Link to='/examples/auth'>Auth</Link>
          <Link to='/examples/validations'>Validations</Link>
        </div>
        <div className='content'>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Examples;
