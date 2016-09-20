import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import yup from 'yup';

import CustomForm, { FORM_ACTIONS } from './CustomForm';
import { getItemData, itemUpdate } from '../../ducks/data';
import { FormSection, FormRow } from '../Common';


const getState = state => ({
  errors: state.form.errors,

  data: state.data.item,
  loading: state.data.itemLoading,
  loaded: state.data.itemLoaded,

  updateLoading: state.data.updateLoading,
  updateLoaded: state.data.updateLoaded,
  updateSuccess: state.data.updateSuccess,
});

const getActions = dispatch => (
  bindActionCreators({
    getItemData,
    itemUpdate,
    ...FORM_ACTIONS,
  }, dispatch)
);

class ValidationsForm extends CustomForm {
  constructor(props) {
    super(props);

    const FieldID = yup.number().integer().positive();
    this.schema = yup.object().shape({
      id: FieldID,
      name: yup.string()
        .trim()
        .min(5, 'Name must be minimum 5 characters!')
        .required('Name is not entered!'),
      title: yup.string()
        .trim()
        .required('Title is not entered!'),
      email: yup.string()
        .email()
        .required('You must enter email!'),
    });

    this.state.formData = this.schema.cast({});
  }

  submit(data) {
    this.props.itemUpdate(this.itemId, data);
  }

  renderContent() {
    return (
      <div>
        <h2>COMPLEX FORM</h2>

        <FormSection>
          {false && <FormRow label='id' value='123' />}
          <FormRow type='edit' field='name' label='Name' />
          <FormRow type='edit' field='title' label='Title' />
          <FormRow type='edit' field='email' label='Email' />
        </FormSection>
      </div>
    );
  }
}

export default connect(getState, getActions)(ValidationsForm);
