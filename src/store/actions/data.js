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

export const courseSelectedHandler = (ID) => {
  return {
    type: types.COURSE_SELECTED,
    payload: ID
  }
}