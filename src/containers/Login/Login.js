import React, { Component } from "react";
import * as classes from "./Login.module.css";
import { Link } from "react-router-dom";
import { elementConfigHandler } from "../../store/utility";
import Input from "../../component/UI/Input/Input";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

class Login extends Component {
  state = {
    loginForm: {
      email: elementConfigHandler(
        "input",
        { type: "email", placeholder: "" },
        "",
        "E-mail"
      ),
      password: elementConfigHandler(
        "input",
        { type: "Password", placeholder: "" },
        "",
        "Password"
      ),
    },
  };

  componentDidUpdate(){
    if(this.props.token){
      this.props.history.push('/')
    }
  }

  inputChangedHandler = (event, el) => {
    const updatedLoginForm = {
      ...this.state.loginForm,
    };
    const updatedFormElement = {
      ...updatedLoginForm[el],
    };

    updatedFormElement.value = event.target.value;
    updatedLoginForm[el] = updatedFormElement;

    this.setState({ loginForm: updatedLoginForm });
  };

  onSubmitLoginForm = (event) => {
    event.preventDefault();
    this.props.onAuth(
      this.state.loginForm.email.value,
      this.state.loginForm.password.value,
      false
    );
  };

  onRegisterHandler = () => {
    this.props.onAuth(
      this.state.loginForm.email.value,
      this.state.loginForm.password.value,
      true
    );
  };

  render() {
    const formElementsArray = [];

    for (let key in this.state.loginForm) {
      formElementsArray.push({
        id: key,
        config: this.state.loginForm[key],
      });
    }

    let errorMessage = null;

    if (this.props.error) {
      errorMessage = <p className={classes.Login__Error}>{this.props.error.message}</p>;
    }

    let form = (
      <form>
        {formElementsArray.map((el) => {
          return (
            <div key={el.id}>
              <h5 style={{ marginBottom: "5px" }}>{el.config.label}</h5>
              <Input
                elementType={el.config.elementType}
                elementConfig={el.config.elementConfig}
                value={el.config.value}
                changed={(event) => this.inputChangedHandler(event, el.id)}
              />
            </div>
          );
        })}

        <button
          className={classes.Login__SignInButton}
          onClick={this.onSubmitLoginForm}
        >
          Sign In
        </button>
      </form>
    );

    return (
      <div className={classes.Login}>
        <Link to="/">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
            className={classes.Login__Logo}
          />
        </Link>
        <div className={classes.Login__Container}>
          <h1>Sign-in</h1>
          {errorMessage}
          {form}

          <p className={classes.Login__Notice}>
            By signing-in you agree to the AMAZON FAKE CLONE Condition of Use &
            Sale. Please see our Privacy Notice, our Cookies Notice and our
            Interest-Based Ads Notice.{" "}
          </p>
          <button
            onClick={this.onRegisterHandler}
            className={classes.Login__RegisterButton}
          >
            Create your Amazon Account
          </button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignUp) =>
      dispatch(actions.auth(email, password, isSignUp)),
  };
};

const mapStateToProps = (state) => {
  return {
    error: state.auth.error,
    token: state.auth.token
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
