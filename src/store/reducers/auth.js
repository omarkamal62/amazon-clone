import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  token: localStorage.getItem('token') ? localStorage.getItem('token') : null,
  userId: localStorage.getItem('userId') ? localStorage.getItem('userId') : null,
  error: null,
  userEmail: localStorage.getItem('userEmail') ? localStorage.getItem('userEmail') :  null,
  loading: false,
  authRedirectPath: "/",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return updateObject(state, { loading: true, error: null });
    case actionTypes.AUTH_SUCCESS:
      return updateObject(state, {
        token: action.token,
        userId: action.userId,
        userEmail: action.userEmail,
        loading: false,
        error: null,
      });
    case actionTypes.AUTH_FAIL:
      return updateObject(state, {
        error: action.error,
        loading: false,
      });
    case actionTypes.AUTH_LOGOUT:
      return updateObject(state, {
        token: null,
        userId: null,
      });
    default:
      return state;
  }
};

export default reducer;
