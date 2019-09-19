export {
  setSelectedCourse,
  setDrawerState,
  setAddCourseDialogState,
  setSelectedCategoryName,
  setAddAssignmentDialogState
} from "./ui";

export { authenticate, logout, tryAutoAuth } from "./auth";

export {
  fetchUserData,
  addCourse,
  addAssignment,
  removeAssignment,
  editAssignment,
  submitFeedback
} from "./data";
