import * as types from "../actions/types";

import { updateObject } from "../util";

const initialState = {
  isDrawerOpen: false,
  showAddCourseDialog: false,
  showAddAssignmentDialog: false,
  selectedCourseID: null,
  selectedCategoryName: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_DRAWER_STATE:
      return updateObject(state, { isDrawerOpen: action.payload });
    case types.COURSE_SELECTED:
      return updateObject(state, { selectedCourseID: action.payload });
    case types.SET_ADD_COURSE_DIALOG_STATE:
      return updateObject(state, { showAddCourseDialog: action.payload });
    case types.SET_SELECTED_CATEGORY_NAME:
      if (state.selectedCategoryName === action.payload) {
        return updateObject(state, { selectedCategoryName: null });
      } else {
        return updateObject(state, { selectedCategoryName: action.payload });
      }
    case types.SET_ADD_ASSIGNMENT_DIALOG_STATE:
      return updateObject(state, { showAddAssignmentDialog: action.payload });
    default:
      return state;
  }
};
