// displays Survey Creation Form and Validates it
import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';
import { Link } from 'react-router-dom';
import validateEmails from '../../utils/validateEmails';
import formFields from './surveyFormFields';

class SurveyForm extends Component {
    renderFields() {
        return _.map(formFields, ({ name, label }) => <Field type="text" component={SurveyField} key={name} name={name} label={label} />)
    }


    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.props.onSubmit)}>
                {this.renderFields()}
                <Link to="/surveys" className="red btn-flat white-text">Cancel</Link>
                <button className="teal btn-flat right white-text" type="submit">Next<i className="material-icons right">done</i></button>
            </form>
        );
    }
}


function validate(values) {
    const errors = {};
    errors.recipients = validateEmails(values.recipients || '');
    _.each(formFields, ({ name }) => {
        if (!values[name]) errors[name] = "You must provide a valid " + name;
    });



    return errors;
}

export default reduxForm({ validate, form: 'surveyForm', destroyOnUnmount: false })(SurveyForm);