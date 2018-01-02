//Shows SurveyFrom and SurveyFromReview
import React, { Component } from 'react';
import SurveyForm from './SurveyForm';
import {reduxForm} from 'redux-form';
import SurveyFormReview from './SurveyFormReview';
class SurveyNew extends Component {


    constructor() {
        super();
        this.state = { reviewForm: false };
        this.setReviewForm = this.setReviewForm.bind(this);
    }

    setReviewForm(review) {
        this.setState({ reviewForm: review });
    }

    render() {
        return (
            <div>
                {(this.state.reviewForm) ? <SurveyFormReview onCancel={() => this.setReviewForm(false)} /> : <SurveyForm onSubmit={() => this.setReviewForm(true)} />}
            </div>
        );
    }
}

export default reduxForm({ form: 'surveyForm' })(SurveyNew);