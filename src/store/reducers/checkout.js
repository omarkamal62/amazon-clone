import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  basket: [],
  totalPrice: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_BASKET:
      const newItem = {
        ...action.item,
      };
      return updateObject(state, {
        basket: state.basket.concat(newItem),
        totalPrice: state.totalPrice + action.item.price,
      });
    case actionTypes.REMOVE_FROM_BASKET:
      return updateObject(state, {
        ...state,
        basket: state.basket.filter((el) => {
          return el.id !== action.item.id;
        }),
        totalPrice: state.totalPrice - action.item.price,
      });
    default: {
      return state;
    }
  }
};

export default reducer;
