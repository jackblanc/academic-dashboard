import * as type from './types'

export const setDrawerState = (boolean) => {
  return {
    type: type.SET_DRAWER_STATE,
    payload: boolean
  }
}