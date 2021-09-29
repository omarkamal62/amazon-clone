import "./App.css";
import Layout from "./hoc/Layout/Layout";
import Home from "./containers/Home/Home";
import Checkout from "./containers/Checkout/Checkout";
import PaymentElement from "./component/Payment/PaymentElement";
import { Switch, Route } from "react-router-dom";
import Login from "./containers/Login/Login";
import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";
import { loadStripe, LoadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe(
  "pk_test_51Jed9mKraWggr0WVDVIx1gXxjyy5U3dIz9Sb7vLzMKPcgn35P4vdH4w5Sxq9nw2iDrknDC9umlxCZGhiat1s4zW900nIgG8kAF"
);

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/checkout" component={Checkout} />
        <Route path="/login" component={Login} />
        <Route path="/payment">
          <Elements stripe={promise}>
            <PaymentElement />
          </Elements>
        </Route>
        <Route path="/" component={Home} />
      </Switch>
    );

    return (
      <div className="App">
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

export default connect(null, mapDispatchToProps)(App);
