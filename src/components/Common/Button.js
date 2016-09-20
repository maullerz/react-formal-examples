import React, { Component } from 'react';
import cn from 'classnames';
import { Button } from 'react-formal';

import Spinner from './Spinner';
import './Button.css';


export class SubmitButton extends Component {
  render() {
    const { text, loading, disabled, ...rest } = this.props;
    const className = cn(
      'btn',
      'mainBtn',
      loading && 'loading',
      disabled && 'disabled'
    );

    return (
      disabled ?
        <button {...rest} className={className}>
          {loading ? <div className='spinner'><Spinner /></div> : <span>{text || 'SUBMIT'}</span>}
        </button>
      :
        <Button {...rest} type='submit' className={className}>
          {loading ? <div className='spinner'><Spinner /></div> : <span>{text || 'SUBMIT'}</span>}
        </Button>
    );
  }
}


export class CancelButton extends Component {
  render() {
    const { text, disabled } = this.props;
    const className = cn(
      'btnDialog',
      'cancelBtn',
      disabled && 'disabled'
    );

    return (
      <button type='button' className={className} onClick={disabled ? null : this.props.onClick}>
        {text || 'ОТМЕНА'}
      </button>
    );
  }
}


export class ConfirmButton extends Component {
  render() {
    const { text, disabled } = this.props;
    const className = cn(
      'btnDialog',
      'confirmBtn',
      disabled && 'disabled'
    );

    return (
      <button type='button' className={className} onClick={disabled ? null : this.props.onClick}>
        {text || 'ДА'}
      </button>
    );
  }
}
