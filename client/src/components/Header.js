import React, { Component } from "react";
import { connect } from "react-redux";
import {Link} from "react-router-dom";


class Header extends Component {

  renderContent(){
    console.log(this.props.auth);
    switch(this.props.auth){
      case null:
            return;
      case false:
            return (<li><a href="/auth/google">Sign in with Google</a></li>);

       default:
            return (<li><a href="/api/logout">Sign Out</a></li>);
            
    }
  }
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link className="left brand-logo" to={ (this.props.auth ) ? "/surveys" : "/"}>QuikFeedback</Link>
          <ul className="right">
          
            <li>
             {this.renderContent()}
            </li>
          </ul>
        </div>
      </nav>
    );
  }

}

 function mapStateToProps({auth}){
  return {auth};
}



export default connect(mapStateToProps)(Header);;