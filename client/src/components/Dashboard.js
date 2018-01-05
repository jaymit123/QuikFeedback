import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SurveyList from './surveys/SurveyList';
import { connect } from 'react-redux';
import { fetchSurveys } from '../actions';
// Fetches user created surveys and displays them using SurveyList modal.
class Dashboard extends Component {

    componentDidMount() {
        this.props.fetchSurveys();
    }

    render() {
        return (
            <div>
                <SurveyList />
                <div className='fixed-action-btn'>
                    <Link to='/surveys/new' className='btn-floating btn-large red'>
                        <i className='large material-icons'>add</i>
                    </Link>
                </div>
            </div>
        );
    }
}

export default connect(null, { fetchSurveys })(Dashboard);