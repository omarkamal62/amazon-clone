import React, { Component } from "react";
import classes from "./Payment.module.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import CheckoutProduct from "../../component/CheckoutProduct/CheckoutProduct";
import CurrencyFormat from "react-currency-format";
import { CardElement } from "@stripe/react-stripe-js";
import axios from "../../axios";
import { withRouter } from "react-router-dom";

class Payment extends Component {
  state = {
    error: null,
    disabled: true,
    processing: "",
    succeeded: false,
    clientSecret: true,
  };

  getClientSecret = async () => {
    const response = await axios({
      method: "post",
      url: "/payments/create?total=" + this.props.price * 100,
    });
    this.setState({
      clientSecret: response.data.clientSecret,
    });
    console.log("CLIE", this.state.clientSecret)
  };

  componentDidMount() {
    if (this.props.price != 0) {
      this.getClientSecret();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.price != prevProps.price) {
      if (this.props.price != 0) {
        this.getClientSecret();
      }
    }
  }

  onHandleSubmit = async (e) => {
    e.preventDefault();
    this.setState({
      processing: true,
    });

    const payload = await this.props.stripe
      .confirmCardPayment(this.state.clientSecret, {
        payment_method: {
          card: this.props.elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        this.setState({
          succeeded: true,
          error: null,
          processing: false,
        });

        this.props.history.replace('/orders')
      });
  };

  onHandleChange = (e) => {
    this.setState({
      error: e.error ? e.error.message : "",
      disabled: e.empty,
    });
  };

  render() {
    const items = this.props.basket.map((item) => {
      return (
        <CheckoutProduct
          key={item.id}
          removed={() => this.removeFromBasket(item)}
          item={item}
        />
      );
    });

    return (
      <div className={classes.Payment}>
        <div className={classes.Payment__Container}>
          <h1>
            Checkout (
            <Link to="/checkout">{this.props.basket.length + " items"}</Link>)
          </h1>
          <div className={classes.Payment__Section}>
            <div className={classes.Payment__Title}>
              <h3>Delivery Address</h3>
            </div>
            <div className={classes.Payment__Address}>
              <p>{this.props.userEmail}</p>
              <p>123 React Lane</p>
              <p>Miami, Alex</p>
            </div>
          </div>
          <div className={classes.Payment__Section}>
            <div className={classes.Payment__Title}>
              <h3>Review items and delivery</h3>
            </div>
            <div className={classes.Payment__Items}>{items}</div>
          </div>
          <div className={classes.Payment__Section}>
            <div className={classes.Payment__Title}>
              <h3>Payment Method</h3>
            </div>
            <div className={classes.Payment__Details}>
              <form onSubmit={this.onHandleSubmit}>
                <CardElement onChange={this.onHandleChange} />
                <div className={classes.Payment__PriceContainer}>
                  <CurrencyFormat
                    decimalScale={2}
                    value={this.props.price}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    renderText={(value) => {
                      return <h3>Order Total: {value}</h3>;
                    }}
                  />
                  <button>
                    <span>
                      {this.state.processing ? <p>Processing</p> : "Buy Now"}
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userEmail: state.auth.userEmail,
    basket: state.checkout.basket,
    price: state.checkout.totalPrice,
  };
};

export default connect(mapStateToProps)(withRouter(Payment));
