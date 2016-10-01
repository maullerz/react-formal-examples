import React from 'react';
import yup from 'yup';
import { Field } from 'react-formal';

import FormConstructor from './FormConstructor';
import InputWrapper from './InputWrapper';

import '../Common/FormRow.css';


export default class AuthForm extends FormConstructor {

  constructor(props) {
    super();
    this.schema = yup.object().shape({
      email: yup.string()
        .email('Invalid email')
        .required('Email is required'),
      name: yup.string()
        .required('Fullname is required'),
      pass: yup.string()
        .required('Password is required'),
      passRepeat: yup.string()
        .required('Password is required')
        .test('isEqual', 'Passwords didn`t matches', value => value === this.state.form.pass),
    });

    this.state = {
      form: this.schema.default(),
      errors: {}
    };
  }

  handleSubmit(formData) {
    // dispatch redux action:
    // this.props.signUp(formData)
    console.log('submitting values:', formData);
  }

  render() {
    return this.renderForm(
      <div>
        <h2>SIGN UP</h2>
        <div>
          <InputWrapper error={this.state.errors.name}>
            <Field name='name' placeholder='Имя' className='input' />
          </InputWrapper>

          <InputWrapper error={this.state.errors.email}>
            <Field name='email' placeholder='Email' className='input' />
          </InputWrapper>

          <InputWrapper error={this.state.errors.pass}>
            <Field name='pass' type='password' placeholder='Password' className='input' />
          </InputWrapper>

          <InputWrapper error={this.state.errors.passRepeat}>
            <Field name='passRepeat' type='password' placeholder='Repeat password' className='input' />
          </InputWrapper>
        </div>
      </div>
    );
  }
}
