import * as types from '../actions/types'

import { updateObject } from '../util'

const initialState = {
  isDrawerOpen: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_DRAWER_STATE:
      return updateObject(state, { isDrawerOpen: action.payload })
    default: return state
  }
}