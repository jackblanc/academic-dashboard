import * as actionTypes from "../actions/actionTypes";

import { updateObject } from "../util";

const initialState = {
  // allCourseData: [
  //   {
  //     title: 'Algorithms',
  //     ID: 'CS5800',
  //     numericGrade: '83.9', // weighted sum of category values
  //     letterGrade: 'B+',
  //     isSelected: false,
  //     categories: [
  //       {
  //         weight: 15,
  //         value: 80.3, // average of all 'assignments'
  //         category: 'Problem Sets'
  //       },
  //       {
  //         weight: 15,
  //         value: 71.7,
  //         category: 'In-Class Quizzes'
  //       },
  //       {
  //         weight: 15,
  //         value: 65,
  //         category: 'Midterm 1'
  //       },
  //       {
  //         weight: 10,
  //         value: 100,
  //         category: 'Programming Assignments'
  //       },
  //       {
  //         weight: 15,
  //         value: 51.7,
  //         category: 'Midterm 2'
  //       },
  //       {
  //         weight: 30,
  //         value: 106.7,
  //         category: 'Final Exam'
  //       }
  //     ]
  //   },
  //   {
  //     title: 'Calculus 2 for Sci/Eng',
  //     ID: 'MATH1342',
  //     numericGrade: '83.4',
  //     letterGrade: 'B',
  //     isSelected: false,
  //     categories: [
  //       {
  //         weight: 20,
  //         value: 85.6,
  //         category: 'Quizzes'
  //       },
  //       {
  //         weight: 20,
  //         value: 90,
  //         category: 'Midterm Exam 1'
  //       },
  //       {
  //         weight: 20,
  //         value: 62.9,
  //         category: 'Midterm Exam 2'
  //       },
  //       {
  //         weight: 40,
  //         value: 90,
  //         category: 'Final Exam'
  //       }
  //     ],
  //   },
  //   {
  //     title: 'Embedded Design',
  //     ID: 'EECE2160',
  //     numericGrade: '98',
  //     letterGrade: 'A',
  //     isSelected: false,
  //     categories: [
  //       {
  //         weight: 5,
  //         value: 100,
  //         category: 'Pre-Lab Assignments'
  //       },
  //       {
  //         weight: 45,
  //         value: 96.9,
  //         category: 'Lab Assignments'
  //       },
  //       {
  //         weight: 25,
  //         value: 100,
  //         category: 'Midterm Project'
  //       },
  //       {
  //         weight: 25,
  //         value: 100,
  //         category: 'Final Project'
  //       }
  //     ],
  //   }
  // ],
  allCourseData: null,
  token: null,
  userID: null,
  error: null,
  loading: false,
  isDrawerOpen: false
};

// CATEGORY REDUCERS
const addCategoryToCourse = (state, action) => {
  // INVARIANT: category is added to selected course
  return updateObject(state, {
    allCourseData: state.allCourseData.map(course => {
      if (course.isSelected) {
        const updatedCategories = [...course.categories];
        updatedCategories.push(action.newCategory);
        return updateObject(course, { categories: updatedCategories });
      } else {
        return course;
      }
    })
  });
};

const removeCategoryFromCourse = (state, action) => {
  return updateObject(state, {
    allCourseData: state.allCourseData.map(course => {
      if (course.isSelected) {
        let updatedCategories = [...course.categories];
        updatedCategories = updatedCategories.filter(
          cat => cat.category !== action.categoryName
        );
        return updateObject(course, { categories: updatedCategories });
      } else {
        return course;
      }
    })
  });
};

const editCategoryInCourse = (state, action) => {
  return updateObject(state, {
    allCourseData: state.allCourseData.map(course => {
      if (course.isSelected) {
        let updatedCategories = [...course.categories];
        updatedCategories = updatedCategories.map(cat => {
          if (cat.category === action.categoryName) {
            return action.newData;
          } else {
            return cat;
          }
        });
        return updateObject(course, { categories: updatedCategories });
      } else {
        return course;
      }
    })
  });
};

const courseSelected = (state, action) => {
  return updateObject(state, {
    allCourseData: state.allCourseData.map(course => {
      return updateObject(course, { isSelected: action.ID === course.ID });
    })
  });
};

// AUTHENTICATION REDUCERS
const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.idToken,
    userID: action.userID,
    error: null,
    loading: false
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const authLogout = (state, action) => {
  return updateObject(state, {
    token: null,
    userId: null
  });
};

const setDrawer = (state, action) => {
  return updateObject(state, {
    isDrawerOpen: action.boolean
  });
};

const fetchUserDataSuccess = (state, action) => {
  return updateObject(state, {
    allCourseData: action.payload
  });
};

const saveUserDataFail = (state, action) => {
  return updateObject(state, {
    error: action.error
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_CATEGORY_TO_COURSE:
      return addCategoryToCourse(state, action);
    case actionTypes.REMOVE_CATEGORY_FROM_COURSE:
      return removeCategoryFromCourse(state, action);
    case actionTypes.EDIT_CATEGORY_IN_COURSE:
      return editCategoryInCourse(state, action);
    case actionTypes.COURSE_SELECTED:
      return courseSelected(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.SET_DRAWER:
      return setDrawer(state, action);
    case actionTypes.FETCH_USER_DATA_SUCCESS:
      return fetchUserDataSuccess(state, action);
    case actionTypes.SAVE_USER_DATA_FAIL:
      return saveUserDataFail(state, action);
    default:
      return state;
  }
};

export default reducer;
