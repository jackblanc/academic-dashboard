export {
  setSelectedCourse,
  setDrawerState,
  setAddCourseDialogState,
  setSelectedCategoryName,
  setAddAssignmentDialogState
} from './ui'

export {
  authenticate,
  logout,
  tryAutoAuth
} from './auth'

export {
  fetchUserData,
  addCategoryToCourse,
  editCategoryInCourse,
  removeCategoryFromCourse,
  addCourse,
  addAssignment
} from './data'