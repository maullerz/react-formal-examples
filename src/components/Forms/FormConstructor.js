import React, {Component} from 'react';
import yup from 'yup';
import Form from 'react-formal';


export default class FormConstructor extends Component {
  constructor() {
    super();
    this.schema = yup.object();
    this.state = {
      form: {},
      errors: {},
      prepared: false
    };

    this.handleError = this.handleError.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
  }

  handleFormChange(values, fields) {
    console.log(`<${fields[0]}> changed:`, values[fields[0]]);
    this.setState({ form: values });
  }

  renderForm(formContent) {
    return (
      <Form
        schema={this.schema}
        value={this.state.form}
        onChange={this.handleFormChange}
        onSubmit={this.handleSubmit}
        onError={this.handleError}
        delay={100}
      >
        {formContent}
      </Form>
    );
  }

  handleError(errors) {
    this.setState({ errors });
  }

  handleSubmit() {}

  render() {
    return null;
  }
}
