import React, { Component } from 'react';
import { connect } from 'react-redux';
import formFields from './surveyFormFields';
import _ from 'lodash';
import { submitSurvey } from '../../actions';
import {withRouter} from 'react-router-dom';
class SurveyFormReview extends Component {

    renderFields() {
        return _.map(formFields, ({ name, label }) =>
            <div key={label}>
                <label style={{ marginBottom: '2px' }}>{label}</label>
                <div style={{ marginBottom: '4px' }}>
                    {this.props.formValues[name]}
                </div>
            </div>)
    }

    render() {
        return (<div>
            <h5> Confirm your entries</h5>
            {this.renderFields()}
            <button onClick={this.props.onCancel} className='yellow darken-3 white-text btn-flat'>Back</button>
            <button onClick={() => {this.props.submitSurvey(this.props.formValues,this.props.history)}} className='green btn-flat white-text right'>Send Survey <i className="material-icons right">email</i></button>
        </div>);
    }


}

function mapStateToProps({ form: { surveyForm: { values } } }) {
    return {
        formValues: values
    }
}

function mapDispatchToProps(dispatch) {
    return {
        submitSurvey: (values,history) => dispatch(submitSurvey(values,history))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SurveyFormReview));