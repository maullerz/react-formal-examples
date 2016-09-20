import React, { Component } from 'react';

import { FormSection, FormRow } from '../Common';


class AuthForm extends Component {
  render() {
    return (
      <div>
        <h2>AUTH FORM</h2>

        <FormSection>
          <FormRow label='TODO' value='Sign in / Sign up' />
        </FormSection>
      </div>
    );
  }
}

export default AuthForm;
