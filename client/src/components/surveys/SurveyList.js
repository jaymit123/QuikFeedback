//Displays all the sureys on dashboard using Cards
import React, { Component } from 'react';
import { connect } from 'react-redux';


class SurveyList extends Component {



    renderSurveys() {
        return this.props.surveys.map(survey => {
            return (
                <div className="col s12 m6" key={survey.title}>
                    <div className="card blue-grey accent-1 darken-1">
                        <div className="card-content white-text">
                            <span className="card-title">{survey.title}</span>
                            <p>{survey.body}</p>

                        </div>

                        <div className="card-action">
                            <span className="white-text">Date Sent : {new Date(survey.dateSent).toDateString()}</span>
                            <span className="white-text badge red">No {survey.no}</span>
                            <span className="white-text badge green">Yes {survey.yes}</span>
                        </div>
                    </div>
                </div>
            )
        });
    }

    render() {
        return (<div className="row" >{this.renderSurveys()}</div>);
    }

}

function mapStateToProps({ surveys }) {
    return { surveys };
}

export default connect(mapStateToProps)(SurveyList);