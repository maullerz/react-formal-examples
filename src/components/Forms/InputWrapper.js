import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

import './InputWrapper.css';


const getStylesFromProps = ({ customMarginBottom = null }) => ({
  marginBottom: customMarginBottom,
});


export default class InputWrapper extends Component {

  render() {
    const errors = this.props.error;
    const className = classnames(
      'wrapper',
      errors && 'hasError'
    );

    return (
      <div style={getStylesFromProps(this.props)} className={className}>
        {this.props.label && <label className='label'>{this.props.label}</label>}
        {this.props.children}
        {errors &&
          <div className='error'>
            {errors[0] && errors[0].message}
          </div>
        }
      </div>
    );
  }
}

InputWrapper.propTypes = {
  children: PropTypes.any,
  error: PropTypes.array,
  label: PropTypes.string,
  tooltip: PropTypes.string,
};
