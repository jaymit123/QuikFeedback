import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./Header";
import Landing from "./Landing";
import { connect } from "react-redux";
import * as actions from "../actions";
import NoMatch from "./NoMatch";
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Header />
          <Switch>
            <Route path="/" exact component={Landing} />
            <Route path="/surveys" exact component={Dashboard} />
            <Route path="/surveys/new" component={SurveyNew} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(null, actions)(App);
