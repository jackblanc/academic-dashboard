import * as types from '../actions/types'
import { updateObject } from '../util';

const initialState = {
  coursesList: null
}

const addCategoryToCourse = (state, action) => {
  // INVARIANT: category is added to selected course
  return updateObject(state, {
    coursesList: state.coursesList.map(course => {
      if (course.isSelected) {
        const updatedCategories = [...course.categories]
        updatedCategories.push(action.payload)
        return updateObject(course, { categories: updatedCategories })
      } else {
        return course
      }
    })
  })
}

const removeCategoryFromCourse = (state, action) => {
  return updateObject(state, {
    coursesList: state.coursesList.map(course => {
      if (course.isSelected) {
        let updatedCategories = [...course.categories]
        updatedCategories = updatedCategories.filter(cat => cat.category !== action.payload)
        return updateObject(course, { categories: updatedCategories })
      } else {
        return course
      }
    })
  })
}

const editCategoryInCourse = (state, action) => {
  return updateObject(state, {
    coursesList: state.coursesList.map(course => {
      if (course.isSelected) {
        let updatedCategories = [...course.categories]
        updatedCategories = updatedCategories.map(cat => {
          if (cat.category === action.payload.categoryName) {
            return action.payload.newData
          } else {
            return cat
          }
        })
        return updateObject(course, { categories: updatedCategories })
      } else {
        return course
      }
    })
  })
}


export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_USER_DATA:
      return updateObject(state, { coursesList: action.payload })
    case types.ADD_CATEGORY_TO_COURSE:
      return addCategoryToCourse(state, action)
    case types.EDIT_CATEGORY_IN_COURSE:
      return editCategoryInCourse(state, action)
    case types.REMOVE_CATEGORY_FROM_COURSE:
      return removeCategoryFromCourse(state, action)
    default:
      return state
  }
}