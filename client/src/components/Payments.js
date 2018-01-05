//Handles Stripe Payment service
import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
import { handlePaymentToken } from "../actions";

//Displays the Stripe Payment Modal
class Payments extends Component {
  render() {
    return (
      <StripeCheckout
        name="QuikFeedback"
        description="$5 for 5 email credits"
        amount={500}
        token={token => this.props.handlePaymentToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
      >
        <button className="btn #f44336 red">Add Credits</button>
      </StripeCheckout>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handlePaymentToken: token => dispatch(handlePaymentToken(token))
  };
};

export default connect(null, mapDispatchToProps)(Payments);
