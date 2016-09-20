import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

import './Spinner.css';


export default class Spinner extends Component {
  render() {
    const className = classnames(
      'spinner',
      this.props.wide && 'wide',
      this.props.field && 'field',
      this.props.fullPage && 'fullPage'
    );

    return (
      <span className={className}></span>
    );
  }
}

Spinner.propTypes = {
  wide: PropTypes.bool,
  field: PropTypes.bool,
  fullPage: PropTypes.bool
};
