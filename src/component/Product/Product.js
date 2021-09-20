import React from "react";
import classes from "./Product.module.css";

const product = (props) => {
  return (
    <div className={classes.Product}>
      <img src={props.image} />
      <div className={classes.Product__Info}>
        <p>{props.title.substring(0, 180) + '...'}</p>
        <div className={classes.Product__Rating}>
          {Array(props.rating).fill().map((_, i) => {
              return <p key={i}>⭐️</p>;
          })}
        </div>
        <div className={classes.Product__Price}>
          <small>$</small>
          <strong>{props.price}</strong>
        </div>
      </div>
      <button onClick={props.addItem}>Add to Cart</button>
    </div>
  );
};

export default product;
