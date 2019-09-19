// TODO remove this, pretty sure it's legacy code, but that's a later problem
// import * as actionTypes from "../actions/actionTypes";

// import { updateObject } from "../util";

// const initialState = {
//   allCourseData: null,
//   token: null,
//   userID: null,
//   error: null,
//   loading: false,
//   isDrawerOpen: false
// };

// // CATEGORY REDUCERS
// const addCategoryToCourse = (state, action) => {
//   // INVARIANT: category is added to selected course
//   return updateObject(state, {
//     allCourseData: state.allCourseData.map(course => {
//       if (course.isSelected) {
//         const updatedCategories = [...course.categories];
//         updatedCategories.push(action.newCategory);
//         return updateObject(course, { categories: updatedCategories });
//       } else {
//         return course;
//       }
//     })
//   });
// };

// const removeCategoryFromCourse = (state, action) => {
//   return updateObject(state, {
//     allCourseData: state.allCourseData.map(course => {
//       if (course.isSelected) {
//         let updatedCategories = [...course.categories];
//         updatedCategories = updatedCategories.filter(
//           cat => cat.category !== action.categoryName
//         );
//         return updateObject(course, { categories: updatedCategories });
//       } else {
//         return course;
//       }
//     })
//   });
// };

// const editCategoryInCourse = (state, action) => {
//   return updateObject(state, {
//     allCourseData: state.allCourseData.map(course => {
//       if (course.isSelected) {
//         let updatedCategories = [...course.categories];
//         updatedCategories = updatedCategories.map(cat => {
//           if (cat.category === action.categoryName) {
//             return action.newData;
//           } else {
//             return cat;
//           }
//         });
//         return updateObject(course, { categories: updatedCategories });
//       } else {
//         return course;
//       }
//     })
//   });
// };

// const courseSelected = (state, action) => {
//   return updateObject(state, {
//     allCourseData: state.allCourseData.map(course => {
//       return updateObject(course, { isSelected: action.ID === course.ID });
//     })
//   });
// };

// // AUTHENTICATION REDUCERS
// const authSuccess = (state, action) => {
//   return updateObject(state, {
//     token: action.idToken,
//     userID: action.userID,
//     error: null,
//     loading: false
//   });
// };

// const authFail = (state, action) => {
//   return updateObject(state, {
//     error: action.error,
//     loading: false
//   });
// };

// const authLogout = (state, action) => {
//   return updateObject(state, {
//     token: null,
//     userId: null
//   });
// };

// const setDrawer = (state, action) => {
//   return updateObject(state, {
//     isDrawerOpen: action.boolean
//   });
// };

// const fetchUserDataSuccess = (state, action) => {
//   return updateObject(state, {
//     allCourseData: action.payload
//   });
// };

// const saveUserDataFail = (state, action) => {
//   return updateObject(state, {
//     error: action.error
//   });
// };

// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case actionTypes.ADD_CATEGORY_TO_COURSE:
//       return addCategoryToCourse(state, action);
//     case actionTypes.REMOVE_CATEGORY_FROM_COURSE:
//       return removeCategoryFromCourse(state, action);
//     case actionTypes.EDIT_CATEGORY_IN_COURSE:
//       return editCategoryInCourse(state, action);
//     case actionTypes.COURSE_SELECTED:
//       return courseSelected(state, action);
//     case actionTypes.AUTH_FAIL:
//       return authFail(state, action);
//     case actionTypes.AUTH_LOGOUT:
//       return authLogout(state, action);
//     case actionTypes.AUTH_SUCCESS:
//       return authSuccess(state, action);
//     case actionTypes.SET_DRAWER:
//       return setDrawer(state, action);
//     case actionTypes.FETCH_USER_DATA_SUCCESS:
//       return fetchUserDataSuccess(state, action);
//     case actionTypes.SAVE_USER_DATA_FAIL:
//       return saveUserDataFail(state, action);
//     default:
//       return state;
//   }
// };

// export default reducer;
