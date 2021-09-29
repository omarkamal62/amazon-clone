import React from "react";
import CurrencyFormat from "react-currency-format";
import classes from "./Subtotal.module.css";
import Auxi from "../../hoc/Auxi/Auxi";

const subtotal = (props) => {
  return (
    <div className={classes.Subtotal}>
      <CurrencyFormat
        decimalScale={2}
        value={props.price}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
        renderText={(value) => {
          return (
            <Auxi>
              <p>
                Subtotal ({props.basketLength} items):
                <strong>{value}</strong>
              </p>
              <small className={classes.Checkout__Gift}>
                <input type="checkbox" /> This order contains a gift
              </small>
            </Auxi>
          );
        }}
      />
      <button onClick={props.clicked}>Proceed to checkout</button>
    </div>
  );
};

export default subtotal;
