import * as types from '../actions/types'

import { updateObject } from '../util'

const initialState = {
  isDrawerOpen: false,
  showAddCourseDialog: false,
  selectedCourseID: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_DRAWER_STATE:
      return updateObject(state, { isDrawerOpen: action.payload })
    case types.COURSE_SELECTED:
      return updateObject(state, { selectedCourseID: action.payload })
    case types.SET_ADD_COURSE_DIALOG_STATE:
      return updateObject(state, { showAddCourseDialog: action.payload })
    default: return state
  }
}