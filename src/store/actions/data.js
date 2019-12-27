import * as types from "./types";
import firebase from "../../firebase";

export const fetchUserData = () => dispatch => {
  firebase
    .database()
    .ref("/users/")
    .child(firebase.auth().currentUser.uid)
    .child("/courseData")
    .on("value", snapshot => {
      dispatch({
        type: types.FETCH_USER_DATA,
        payload: snapshot.val()
      });
    });
};

export const addCourse = (courseID, courseData) => dispatch => {
  firebase
    .database()
    .ref("/users/")
    .child(firebase.auth().currentUser.uid)
    .child("/courseData")
    .child(courseID)
    .set({
      ...courseData
    });
};

export const addAssignment = (
  assignmentName,
  pointsEarned,
  pointsPossible,
  dueDate,
  dueTime,
  isSubmitted,
  isGraded,
  courseID,
  categoryName
) => dispatch => {
  const error = {
    assignmentNameError: null,
    pointsEarnedError: null,
    pointsPossibleError: null
  };
  if (assignmentName === "") {
    error.assignmentNameError = "Assignment Name field cannot be empty";
  }
  if (isNaN(pointsEarned) && isGraded) {
    error.pointsEarnedError = "Points Earned field must be a number";
  } else if (pointsEarned === "") {
    pointsEarned = "Assignment not graded";
  }
  if (isNaN(pointsPossible) && isGraded) {
    error.pointsPossibleError = "Points Possible field must be a number";
  } else if (pointsPossible === "") {
    pointsPossible = "Assignment not graded";
  }
  if (
    error.assignmentNameError === null &&
    error.pointsPossibleError === null &&
    error.pointsEarnedError === null
  ) {
    const combinedDueDateTime = new Date(
      dueDate.getFullYear(),
      dueDate.getMonth(),
      dueDate.getDate(),
      dueTime.getHours(),
      dueTime.getMinutes(),
      dueTime.getSeconds()
    );
    console.log(combinedDueDateTime);
    dispatch(
      addAssignmentSuccess(
        assignmentName,
        pointsEarned,
        pointsPossible,
        combinedDueDateTime,
        isSubmitted,
        isGraded,
        courseID,
        categoryName
      )
    );
  } else {
    dispatch(addAssignmentError(error));
  }
};

export const addAssignmentError = error => dispatch => {
  dispatch({
    type: types.ADD_ASSIGNMENT_ERROR,
    payload: error
  });
};

export const addAssignmentSuccess = (
  assignmentName,
  pointsEarned,
  pointsPossible,
  combinedDueDateTime,
  isSubmitted,
  isGraded,
  courseID,
  categoryName
) => dispatch => {
  const reference = firebase
    .database()
    .ref("/users/")
    .child(firebase.auth().currentUser.uid)
    .child("/courseData")
    .child(courseID)
    .child("/categories/")
    .child(categoryName)
    .child("/assignments/")
    .child(assignmentName);
  reference.child("/isGraded/").set(isGraded);
  reference.child("/isSubmitted/").set(isSubmitted);
  reference.child("/pointsEarned/").set(pointsEarned);
  reference.child("/pointsPossible/").set(pointsPossible);
  reference.child("/dueDate/").set(combinedDueDateTime.toISOString());
  reference.child("/dateCreated/").set(new Date().toISOString());
  dispatch({
    type: types.ADD_ASSIGNMENT_SUCCESS
  });
  dispatch({
    type: types.SET_ADD_ASSIGNMENT_DIALOG_STATE,
    payload: false
  });
};

export const removeAssignment = (
  assignmentName,
  courseID,
  categoryName
) => dispatch => {
  firebase
    .database()
    .ref("/users/")
    .child(firebase.auth().currentUser.uid)
    .child("/courseData")
    .child(courseID)
    .child("/categories/")
    .child(categoryName)
    .child("/assignments/")
    .child(assignmentName)
    .remove();
};

export const editAssignment = (
  courseID,
  categoryName,
  assignmentName,
  fieldName,
  newValue
) => dispatch => {
  firebase
    .database()
    .ref("/users/")
    .child(firebase.auth().currentUser.uid)
    .child("/courseData")
    .child(courseID)
    .child("/categories/")
    .child(categoryName)
    .child("/assignments/")
    .child(assignmentName)
    .child(fieldName)
    .set(newValue);
};

export const submitFeedback = feedbackText => dispatch => {
  firebase
    .database()
    .ref("/feedback/")
    .push(feedbackText);
};

export const editCategory = (
  courseID,
  categoryName,
  fieldName,
  newValue
) => dispatch => {
  firebase
    .database()
    .ref("/users/")
    .child(firebase.auth().currentUser.uid)
    .child("/courseData")
    .child(courseID)
    .child("/categories/")
    .child(categoryName)
    .child(fieldName)
    .set(newValue);
};
