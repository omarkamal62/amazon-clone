import React from "react";
import classes from "./Header.module.css";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Link } from "react-router-dom";

const header = (props) => {
  return (
    <div className={classes.Header}>
      <Link to="/">
        <img
          className={classes.Header__Logo}
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt="amazon-logo"
        />
      </Link>

      <div className={classes.Header__Search}>
        <input type="text" className={classes.Header__SearchInput} />
        <SearchIcon className={classes.Header__SearchIcon} />
      </div>

      <div className={classes.Header__Nav}>
        <div style={{cursor: 'pointer'}} className={classes.Header__Option} onClick={props.authClicked}>
          <span className={classes.Header__OptionLineOne}>
            Hello, {props.userId ? "User" : "Guest"}
          </span>
          <span className={classes.Header__OptionLineTwo}>
            {props.userId ? "Sign Out" : "Sign In"}
          </span>
        </div>
        <div className={classes.Header__Option}>
          <span className={classes.Header__OptionLineOne}>Returns</span>
          <span className={classes.Header__OptionLineTwo}>Order</span>
        </div>
        <div className={classes.Header__Option}>
          <span className={classes.Header__OptionLineOne}>Your</span>
          <span className={classes.Header__OptionLineTwo}>Prime</span>
        </div>
        <Link to="/checkout">
          <div className={classes.Header__OptionBasket}>
            <ShoppingBasketIcon />
            <span
              className={[
                classes.Header__OptionLineTwo,
                classes.Header__BasketCount,
              ].join(" ")}
            >
              {props.basketLength}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default header;
