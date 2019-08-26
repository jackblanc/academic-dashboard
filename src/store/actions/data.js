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
  assignmentComplete,
  assignmentSubmitted,
  assignmentGraded,
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
  if (isNaN(pointsEarned) && assignmentGraded) {
    error.pointsEarnedError = "Points Earned field must be a number";
  } else if (pointsEarned === "") {
    pointsEarned = "Assignment not graded";
  }
  if (isNaN(pointsPossible) && assignmentGraded) {
    error.pointsPossibleError = "Points Possible field must be a number";
  } else if (pointsPossible === "") {
    pointsPossible = "Assignment not graded";
  }
  if (
    error.assignmentNameError === null &&
    error.pointsPossibleError === null &&
    error.pointsEarnedError === null
  ) {
    dispatch(
      addAssignmentSuccess(
        assignmentName,
        pointsEarned,
        pointsPossible,
        dueDate,
        assignmentComplete,
        assignmentSubmitted,
        assignmentGraded,
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
  dueDate,
  assignmentComplete,
  assignmentSubmitted,
  assignmentGraded,
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
    .child("/assignmentGraded/")
    .set(assignmentGraded);
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
    .child("/assignmentSubmitted/")
    .set(assignmentSubmitted);
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
    .child("/assignmentComplete/")
    .set(assignmentComplete);
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
    .child("/pointsEarned/")
    .set(pointsEarned);
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
    .child("/pointsPossible/")
    .set(pointsPossible);
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
    .child("/dueDate/")
    .set(dueDate.toISOString());
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
    .child("/dateCreated/")
    .set(new Date().toISOString());
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
