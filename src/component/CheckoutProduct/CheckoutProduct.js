import React from "react";
import classes from "./CheckoutProduct.module.css";

const checkoutProduct = (props) => {
  return (
    <div className={classes.CheckoutProduct}>
      <img src={props.item.image} className={classes.CheckoutProduct__Image} />
      <div className={classes.CheckoutProduct__Info}>
        <p className={classes.CheckoutProduct__Title}>{props.item.title}</p>
        <p className={classes.CheckoutProduct__Price}>
          <small>$</small>
          <strong>{props.item.price}</strong>
        </p>
        <div className={classes.CheckoutProduct__Rating}>
          {Array(props.item.rating)
            .fill()
            .map((_, i) => {
              return <p key={i}>⭐️</p>;
            })}
        </div>
        <button onClick={props.removed}>Remove from cart</button>
      </div>
    </div>
  );
};

export default checkoutProduct;
