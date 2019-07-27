import * as types from '../actions/types'
import { updateObject } from '../util';

const initialState = {
  coursesList: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_USER_DATA:
      return updateObject(state, { coursesList: action.payload })
    default:
      return state
  }
}