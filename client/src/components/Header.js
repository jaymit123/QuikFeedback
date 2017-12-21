import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { logoutUser } from "../actions";
import Payments from "./Payments";

class Header extends Component {
  constructor() {
    super();
    this.logoutUser = this.logoutUser.bind(this);
  }

  logoutUser() {
    this.props.logoutUser();
    this.props.history.push("/");
  }

  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return [
          <li key="SignIn">
            <a href="/auth/google">Sign in with Google</a>
          </li>
        ];

      default:
        return [
          <li key="Payments">
            <Payments />
          </li>,
          <li key="Credits" style={{margin:'0 10px'}}>Credits: {this.props.auth.credits}</li>,
          <li key="Logout" >
            <a onClick={() => this.logoutUser()}>Sign Out</a>
          </li>
        ];
    }
  }
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link
            className="left brand-logo"
            to={this.props.auth ? "/surveys" : "/"}
          >
            QuikFeedback
          </Link>
          <ul className="right">{this.renderContent()}</ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

function mapDispatchToProps(dispatch) {
  return {
    logoutUser: () => dispatch(logoutUser())
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
