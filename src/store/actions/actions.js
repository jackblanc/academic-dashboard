import * as actionTypes from './actionTypes'
import axios from '../../axios'

import firebase from '../../firebase'

// AUTHENTICATION ACTIONS

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const authSuccess = (idToken, userID) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: idToken,
    userID: userID
  }
}

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  }
}

export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('expirationDate')
  localStorage.removeItem('userID')
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}

export const checkAuthTimeout = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout())
    }, expirationTime * 1000)
  }
}

export const auth = (email, password, isSignup) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCYCXB4wt7cz1Zb9rjjHeev0o1RSoNkfAU';
    if (!isSignup) {
      url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCYCXB4wt7cz1Zb9rjjHeev0o1RSoNkfAU';
    }
    axios.post(url, authData)
      .then(response => {
        console.log(response);
        const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)
        localStorage.setItem('token', response.data.idToken);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('userId', response.data.localId);

        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeout(response.data.expiresIn))
      })
      .catch(error => {
        dispatch(authFail(error.response.data.error));
      })

  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate > new Date()) {
        const userId = localStorage.getItem('userId')
        dispatch(authSuccess(token, userId))
        dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
      } else {
        dispatch(logout())
      }
    }
  }
}

// CATEGORY ACTIONS

export const addCategory = (category) => {
  return {
    newCategory: category,
    type: actionTypes.ADD_CATEGORY_TO_COURSE
  }
}

export const removeCategory = (categoryName) => {
  return {
    categoryName: categoryName,
    type: actionTypes.REMOVE_CATEGORY_FROM_COURSE
  }
}

export const editCategory = (categoryName, newData) => {
  return {
    categoryName: categoryName,
    newData: newData,
    type: actionTypes.EDIT_CATEGORY_IN_COURSE
  }
}

export const courseSelected = (ID) => {
  return {
    ID: ID,
    type: actionTypes.COURSE_SELECTED
  }
}

// UI ACTION
export const setDrawer = (boolean) => {
  return {
    boolean: boolean,
    type: actionTypes.SET_DRAWER
  }
}

// DATA ACTIONS 
export const fetchUserData = (token, userID) => {
  return dispatch => {
    dispatch(fetchUserDataStart());
    const queryParams = '?auth=' + token //+ '&orderBy="userID"&equalTo="' + userID + '"';
    axios.get('/users/' + userID + '.json' + queryParams)
      .then(res => {
        const data = [];
        for (let key in res.data) {
          data.push({
            ...res.data[key],
            id: key
          });
        }
        const mostRecentData = data[data.length - 1]
        dispatch(fetchUserDataSuccess(mostRecentData))
        console.log(res)
      })
      .catch(err => {
        console.log(err)
        dispatch(fetchUserDataFail(err));
      });
  }
}

export const fetchUserDataSuccess = (data) => {
  return {
    type: actionTypes.FETCH_USER_DATA_SUCCESS,
    data: data
  }
}

export const fetchUserDataFail = (error) => {
  return {
    type: actionTypes.FETCH_USER_DATA_FAIL,
    error: error
  }
}

export const fetchUserDataStart = () => {
  return {
    type: actionTypes.FETCH_USER_DATA_START
  }
}

export const saveUserData = (token, data, userID) => {
  return dispatch => {
    dispatch(saveUserDataStart());
    axios.patch('/users/' + userID + '.json?auth=' + token, data)
      .then(res => {
        dispatch(saveUserDataSuccess());
      })
      .catch(err => {
        dispatch(saveUserDataFail(err));
      });
  }
}

export const saveUserDataFail = (error) => {
  return {
    type: actionTypes.SAVE_USER_DATA_FAIL,
    error: error
  }
}

export const saveUserDataStart = () => {
  return {
    type: actionTypes.SAVE_USER_DATA_START
  }
}

export const saveUserDataSuccess = () => {
  return {
    type: actionTypes.SAVE_USER_DATA_SUCCESS
  }
}
