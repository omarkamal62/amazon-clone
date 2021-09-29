import React, { Component } from "react";
import Header from "../../component/Navigation/Header/Header";
import Auxi from "../Auxi/Auxi";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import { withRouter } from "react-router";

class Layout extends Component {
  handleAuth =  () => {
    if (this.props.userId) {
      this.props.onLogout();
    } else {
      this.props.history.push("/login");
    }
  }

  render() {
    let header = null;
    if (this.props.history.location.pathname !== "/login") {
      header = (
        <Header
          userEmail={this.props.userEmail}
          authClicked={this.handleAuth}
          userId={this.props.userId}
          basketLength={this.props.basket.length}
        />
      );
    }

    return (
      <Auxi>
        {header}
        <main>{this.props.children}</main>
      </Auxi>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(actions.logout()),
  };
};

const mapStateToProps = (state) => {
  return {
    basket: state.checkout.basket,
    userId: state.auth.userId,
    userEmail: state.auth.userEmail
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Layout));
