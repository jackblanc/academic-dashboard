import * as type from './types'

export const setDrawerState = (boolean) => {
  return {
    type: type.SET_DRAWER_STATE,
    payload: boolean
  }
}

export const setSelectedCourse = (ID) => {
  return {
    type: type.COURSE_SELECTED,
    payload: ID
  }
}

export const setAddCourseDialogState = (boolean) => {
  return {
    type: type.SET_ADD_COURSE_DIALOG_STATE,
    payload: boolean
  }
}