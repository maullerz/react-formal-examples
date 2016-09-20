import React, { Component } from 'react';
import Form from 'react-formal';
import yup from 'yup';
import { debounce } from 'lodash';

import { setValidationErrors, clearValidationErrors } from '../../ducks/form';
import { SubmitButton } from '../Common/Button';
import './CustomForm.css';


const VALIDATION_DELAY = 500;

export const FORM_ACTIONS = {
  setValidationErrors,
  clearValidationErrors,
};


export default class CustomCard extends Component {
  constructor(props) {
    super(props);

    this.schema = yup.object();
    this.state = {
      formData: null,
      changed: false,
    };

    this.changeForm = this.changeForm.bind(this);
    this.preSubmit = this.preSubmit.bind(this);
    this.onInvalidSubmit = this.onInvalidSubmit.bind(this);
    this.debouncedFormChangeHandler = debounce(this.handleFormChange, VALIDATION_DELAY).bind(this);
  }

  componentDidMount() {
    this.props.getItemData();
    this.props.clearValidationErrors();
  }

  componentWillUnmount() {
    this.props.clearValidationErrors();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.loading && nextProps.loaded) {
      const data = this.schema.cast(nextProps.data);
      this.setState({ formData: data });
    }

    if (this.props.updateLoading && this.state.changed && nextProps.updateSuccess) {
      this.setState({ changed: false });
      this.props.clearValidationErrors();
      this.changedFields = [];
    }
  }

  preSubmit(data) {
    if (!this.state.changed) return;
    this.processValidationOnSubmit(data, this.submit);
  }

  changeForm(updatedValues, changedFields) {
    // console.log(`${changedFields} changed:`, updatedValues);
    this.debouncedFormChangeHandler(updatedValues);
    this.setState({ formData: updatedValues, changed: true });
  }

  handleFormChange(updatedValues) {
    // https://github.com/jquense/yup#mixedvalidatevalue-any-options-object-callback-function-promiseany-validationerror
    this.schema.validate(updatedValues, { abortEarly: false })
      .then(value => this.props.clearValidationErrors())
      .catch(validationErr => {
        this.props.setValidationErrors(validationErr);
      });
  }

  getErrorsMsg(errors) {
    return Object.keys(errors).map(field => errors[field][0].message).join('<br />');
  }

  onInvalidSubmit(errors) {
    const message = this.getErrorsMsg(errors);
    // this.props.notify(NOTIFICATION_ERROR, message);
    console.log('validation on submit errors:', message);
    this.props.setValidationErrors(errors);
  }

  processValidationOnSubmit(data, onValidated) {
    let validatedData = null;
    this.schema.validate(data)
      .then(value => {
        this.setState({ formData: value });
        validatedData = value;
        onValidated.call(this, validatedData);
      })
      .catch(err => {
        console.log('processValidationOnSubmit:Error:', err);
        return null;
      });
  }

  submit() {
    console.log('submit() not implementhed!');
    return null;
  }

  renderContent() {
    console.log('CustomCard: renderContent() not implementhed!');
    return null;
  }

  renderForm(formContent) {
    return (
      <Form
        ref='form'
        schema={this.schema}
        value={this.state.formData}
        onChange={this.changeForm}
        onSubmit={this.preSubmit}
        onInvalidSubmit={this.onInvalidSubmit}
        delay={300}
      >
        {formContent}
      </Form>
    );
  }

  render() {
    const { changed } = this.state;
    const formIsLoading = this.props.loading;

    return this.renderForm(
      <div className='formRoot'>
        {formIsLoading ? <EmptyContent /> : this.renderContent()}

        <div className='footer'>
          <SubmitButton disabled={!changed} loading={this.props.updateLoading} />
        </div>
      </div>
    );
  }
}


const rowBig = (
  <div className='rowBig'>
    <div className='elemBig' />
  </div>
);
const row = (
  <div className='row'>
    <div className='elem' />
  </div>
);

function EmptyContent(props) {
  return (
    <div className='emptyCard'>
      {rowBig}
      {row}
      {rowBig}
      {row}
      {rowBig}
    </div>
  );
}
