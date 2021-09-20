import "./App.css";
import Layout from "./hoc/Layout/Layout";
import Home from "./containers/Home/Home";
import Checkout from "./containers/Checkout/Checkout";
import { Switch, Route } from "react-router-dom";
import Login from "./containers/Login/Login";
import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/checkout" component={Checkout} />
        <Route path="/login" component={Login} />
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
