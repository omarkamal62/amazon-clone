import * as actionTypes from "./actionTypes";

export const addToBasket = (item) => {
  return {
    type: actionTypes.ADD_TO_BASKET,
    item: item,
  };
};

export const removeFromBasket = (item) => {
  return {
    type: actionTypes.REMOVE_FROM_BASKET,
    item: item,
  };
};
