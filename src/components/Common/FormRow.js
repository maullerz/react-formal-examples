import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field } from 'react-formal';
import { isObject } from 'lodash';
import cx from 'classnames';

import './FormRow.css';


const getState = state => ({
  errors: state.form.errors,
});

class FormRow extends Component {
  render() {
    const { props } = this;
    const { errors, field } = props;

    const isInvalid = errors && errors[field];

    return (
      <div className={'root'}>
        <label className={cx('label', isInvalid && 'invalid')}>
          {props.label}
        </label>
        <div className={cx('value', isInvalid && 'invalid')}>
          {props.children ? props.children : getInputType(props)}
        </div>
      </div>
    );
  }
}
export default connect(getState)(FormRow);


function getInputType(props) {
  const { type, value, field, placeholder, ...otherProps } = props;
  const pl = placeholder || '...';

  if (isObject(type)) return <Field type={type} name={field} {...otherProps} />;

  function handleChange(e) {
    if (props.onChange) props.onChange(props.field, e.target.value, props.index);
  }

  switch (type) {
    case 'raw-edit':
      return <input onChange={handleChange} type='text' className={'input'} value={value} placeholder={pl} />;

    case 'edit':
      return <Field type='text' className={'input'} name={field} placeholder={pl} />;

    case 'textarea':
      return <Field type='textarea' className={'textarea'} name={field} maxLength='10240' rows='3' placeholder={pl} />;

    default:
      return <div className={'text'}>{value}</div>;
  }
}
