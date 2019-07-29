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
