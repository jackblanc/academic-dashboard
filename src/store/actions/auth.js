import * as types from './types'

import firebase from '../../firebase'

export const authenticate = (email, password, isSignIn) => dispatch => {
  if (isSignIn) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(res => dispatch(authSuccess()))
      .catch(err => dispatch(authError(err.message)))
  } else {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(res => dispatch(authSuccess()))
      .catch(err => dispatch(authError(err.message)))
  }
}

export const tryAutoAuth = () => dispatch => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      dispatch(authSuccess())
    }
  })
}

export const authSuccess = () => {
  return {
    type: types.AUTH_SUCCESS
  }
}

export const authError = (err) => {
  console.log(err)
  return {
    type: types.AUTH_ERROR,
    payload: err
  }
}

export const logout = () => {
  firebase.auth().signOut()
  return {
    type: types.AUTH_LOGOUT
  }
}