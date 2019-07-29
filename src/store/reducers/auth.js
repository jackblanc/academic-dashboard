import * as actions from "../actions/types";

import { updateObject } from "../util";

const initialState = {
  isAuthenticated: false,
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.AUTH_SUCCESS:
      return updateObject(state, { isAuthenticated: true, error: null });
    case actions.AUTH_ERROR:
      return updateObject(state, {
        isAuthenticated: false,
        error: action.payload
      });
    case actions.AUTH_LOGOUT:
      return updateObject(state, { isAuthenticated: false });
    default:
      return state;
  }
};

export default reducer;
