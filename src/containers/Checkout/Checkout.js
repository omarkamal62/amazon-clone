import React, { Component } from "react";
import classes from "./Checkout.module.css";
import Subtotal from "../../component/Subtotal/Subtotal";
import CheckoutProduct from "../../component/CheckoutProduct/CheckoutProduct";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Auxi from "../../hoc/Auxi/Auxi";

class Checkout extends Component {
  removeFromBasket(item) {
    this.props.onRemoveFromBasket(item);
  }

  render() {
    const basketItems = this.props.basket.map((item) => {
      return (
        <CheckoutProduct
          key={item.id}
          removed={() => this.removeFromBasket(item)}
          item={item}
        />
      );
    });

    let basket = (
      <Auxi>
        <div className={classes.Checkout__EmptyCart}>
          <img src="https://static.wixstatic.com/media/7742ef_dfe620d0354b471b8620fcb2c3a46e62~mv2.gif" />
          <div className={classes.Checkout__EmptyCartInfo}>
            <h1>Your amazon cart is empty</h1>
            <span className={classes.Checkout__EmptyCartLink}>
              Shop today's deal
            </span>
            <div className={classes.Checkout__EmptyCartButtons}>
              <button className={classes.Checkout__EmptyCartSignIn}>
                Sign in to your account
              </button>
              <button className={classes.Checkout__EmptyCartSignUp}>
                Sign up now
              </button>
            </div>
          </div>
        </div>
        <div className={classes.Checkout__EmptyDiv}></div>
      </Auxi>
    );

    if (this.props.basket.length > 0) {
      basket = (
        <Auxi>
          <div className={classes.Checkout}>
            <div className={classes.Checkout__Left}>
              <img
                className={classes.Checkout__Ad}
                src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
              />
              <h3 style={{ marginRight: "10px", padding: "10px" }}>
                Hello, {this.props.userEmail}
              </h3>
              <h2 className={classes.Checkout__Title}>Your shopping cart</h2>
              {basketItems}
            </div>
            <div className={classes.Checkout__Right}>
              <Subtotal
                price={this.props.price}
                basketLength={this.props.basket.length}
              />
            </div>
          </div>
        </Auxi>
      );
    }

    return <Auxi>{basket}</Auxi>;
  }
}

const mapStateToProps = (state) => {
  return {
    price: state.checkout.totalPrice,
    basket: state.checkout.basket,
    userEmail: state.auth.userEmail,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onRemoveFromBasket: (item) => dispatch(actions.removeFromBasket(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
