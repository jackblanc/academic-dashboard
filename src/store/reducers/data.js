import * as types from "../actions/types";
import { updateObject } from "../util";

const initialState = {
  coursesList: null,
  addAssignmentError: {
    assignmentNameError: null,
    pointsEarnedError: null,
    pointsPossibleError: null
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_USER_DATA:
      return updateObject(state, { coursesList: action.payload });
    case types.ADD_ASSIGNMENT_SUCCESS:
      return updateObject(state, {
        addAssignmentError: {
          assignmentNameError: null,
          pointsEarnedError: null,
          pointsPossibleError: null
        }
      });
    case types.ADD_ASSIGNMENT_ERROR:
      return updateObject(state, { addAssignmentError: action.payload });
    default:
      return state;
  }
};
