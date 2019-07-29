import { combineReducers } from "redux";

import auth from "./auth";
import ui from "./ui";
import data from "./data";

export default combineReducers({
  auth,
  ui,
  data
});
