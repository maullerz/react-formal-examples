import React, { Component } from 'react';
// import cn from 'classnames';
import Form from 'react-formal';
import yup from 'yup';
import { each, clone, map, isArray, isObject, debounce } from 'lodash';

import { setValidationErrors, clearValidationErrors, setFormItemId, clearFormItemId } from '../../ducks/form';
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
    this.onErrors = this.onErrors.bind(this);
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

      // TODO: save initial form values in different state-value
      // ...

      const data = this.schema.cast(nextProps.data);
      this.setState({ formData: data });
    }

    if (this.props.editLoading && this.state.changed && nextProps.editSuccess) {
      this.setState({ changed: false });
      this.props.clearValidationErrors && this.props.clearValidationErrors();
      this.changedFields = [];
    }
  }

  preSubmit(data) {
    if (!this.state.changed) return;
    // if (this.props.setPopupErrors) this.props.setPopupErrors([]);
    this.processValidationOnSubmit(data, this.submit);
  }

  changeForm(values, fields) {
    // TODO here we need to check for changes => Enable/Disable saving & ConfirmExitWithoutSave & etc
    // assert(fields.length === 1);
    if (fields.length > 1) console.error('more than one field updated in Form:', fields.length);

    const currForm = this.state.formData;
    const path = fields[0];

    // if (__DEV__) console.log('changeForm:', path, values[path]);

    // воркэраунд для того, чтобы отправлять на обновление только измененные поля
    if (this.getValueByPath(values, path) !== this.getValueByPath(currForm, path)) {
      const updatedValues = clone(values, true);
      each(fields, field => {
        // updatedValues[field] = this.anyValueToId(values[field]);
        updatedValues[field] = this.getValueByPath(values, field);
        if (this.changedFields.indexOf(field) < 0) this.changedFields.push(field);
      });

      // exec debounced validation
      this.debouncedFormChangeHandler(updatedValues);

      this.setState({ formData: updatedValues, changed: true });
    }
  }

  handleFormChange(updatedValues) {
    // Два варианта:
    // 1. abortEarly: false
    // всегда валидируем всю форму до конца и перезаписываем errors в стейте
    // и тогда нам нужен доп метод для парсинга ошибок из ValidationError['inner']
    //
    // 2. получаем только первую встреченную ошибку валидации и ...
    // а если у нас после инвалид-сабмита было подсвечено много полей?
    // получается эту ошибку мы должны мержить в стейт

    this.schema.validate(updatedValues, { abortEarly: false })
      .then(value => this.props.clearValidationErrors())
      .catch(validationErr => {
        this.props.setValidationErrors && this.props.setValidationErrors(validationErr);
      });
  }

  getErrorsMsg(errors) {
    return Object.keys(errors).map(field => errors[field][0].message).join('<br />');
  }

  onInvalidSubmit(errors) {
    const message = this.getErrorsMsg(errors);
    // this.props.notify(NOTIFICATION_ERROR, message);
    this.props.setValidationErrors && this.props.setValidationErrors(errors);
  }

  processValidationOnSubmit(data, onValidated) {
    let validatedData = null;
    this.schema.validate(data)
      .then(value => {
        // console.log('validated data:', value);
        this.setState({ formData: value });
        validatedData = value;
        // this.submit(validatedData);
        onValidated.call(this, validatedData);
      })
      .catch(err => {
        console.log('processValidationOnSubmit:Error:', err);
        return null;
      });
  }

  onErrors(errors) {
    // nothing here now
    // console.error('onErrors(errors)', errors);
    // FIXME: react-formal issue
    // this.props.setValidationErrors && this.props.setValidationErrors(errors);
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
        onError={this.onErrors}
        onInvalidSubmit={this.onInvalidSubmit}
        delay={300}
      >
        {formContent}
      </Form>
    );
  }

  render() {
    const { formData } = this.state;
    const formIsLoading = this.props.loading;

    return this.renderForm(
      <div className='formRoot'>
        {formIsLoading ? <EmptyContent /> : this.renderContent()}

        <div className='footer'>
          <button type='submit'>SUBMIT</button>
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


function EmptyHeader(props) {
  return (
    <div className='emptyHeader'>
      <div className='elemBig' />
      <div className='elem' />
    </div>
  );
}

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
