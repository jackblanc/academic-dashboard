import * as types from './types'
import firebase from '../../firebase'

export const fetchUserData = () => dispatch => {
  firebase.database().ref('/users/')
    .child(firebase.auth().currentUser.uid)
    .child('/courseData')
    .on('value', snapshot => {
      dispatch({
        type: types.FETCH_USER_DATA,
        payload: snapshot.val()
      })
    })
}

export const addCourse = (courseID, courseData) => dispatch => {
  firebase.database().ref('/users/')
    .child(firebase.auth().currentUser.uid)
    .child('/courseData')
    .child(courseID)
    .set({
      ...courseData
    })
}

export const addAssignment = (assignmentName, assignmentScore, courseID, categoryName) => dispatch => {
  console.log('here')
  firebase.database().ref('/users/')
    .child(firebase.auth().currentUser.uid)
    .child('/courseData')
    .child(courseID)
    .child('/categories/')
    .child(categoryName)
    .child('/assignments/')
    .child(assignmentName)
    .set(assignmentScore)
}



export const addCategoryToCourse = (newCategory) => {
  return {
    type: types.ADD_CATEGORY_TO_COURSE,
    payload: newCategory
  }
}

export const editCategoryInCourse = (categoryName, newData) => {
  return {
    type: types.EDIT_CATEGORY_IN_COURSE,
    payload: {
      categoryName, newData
    }
  }
}

export const removeCategoryFromCourse = (categoryName) => {
  return {
    type: types.REMOVE_CATEGORY_FROM_COURSE,
    payload: categoryName
  }
}
