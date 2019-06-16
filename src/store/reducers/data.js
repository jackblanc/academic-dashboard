import * as types from '../actions/types'
import { updateObject } from '../util';

const loremIpsumData = [
  {
    title: 'Algorithms',
    ID: 'CS5800',
    numericGrade: '83.9', // weighted sum of category values
    letterGrade: 'B+',
    isSelected: false,
    categories: [
      {
        weight: 15,
        value: 80.3, // average of all 'assignments'
        category: 'Problem Sets'
      },
      {
        weight: 15,
        value: 71.7,
        category: 'In-Class Quizzes'
      },
      {
        weight: 15,
        value: 65,
        category: 'Midterm 1'
      },
      {
        weight: 10,
        value: 100,
        category: 'Programming Assignments'
      },
      {
        weight: 15,
        value: 51.7,
        category: 'Midterm 2'
      },
      {
        weight: 30,
        value: 106.7,
        category: 'Final Exam'
      }
    ]
  },
  {
    title: 'Calculus 2 for Sci/Eng',
    ID: 'MATH1342',
    numericGrade: '83.4',
    letterGrade: 'B',
    isSelected: false,
    categories: [
      {
        weight: 20,
        value: 85.6,
        category: 'Quizzes'
      },
      {
        weight: 20,
        value: 90,
        category: 'Midterm Exam 1'
      },
      {
        weight: 20,
        value: 62.9,
        category: 'Midterm Exam 2'
      },
      {
        weight: 40,
        value: 90,
        category: 'Final Exam'
      }
    ],
  },
  {
    title: 'Embedded Design',
    ID: 'EECE2160',
    numericGrade: '98',
    letterGrade: 'A',
    isSelected: false,
    categories: [
      {
        weight: 5,
        value: 100,
        category: 'Pre-Lab Assignments'
      },
      {
        weight: 45,
        value: 96.9,
        category: 'Lab Assignments'
      },
      {
        weight: 25,
        value: 100,
        category: 'Midterm Project'
      },
      {
        weight: 25,
        value: 100,
        category: 'Final Project'
      }
    ],
  }
]

const initialState = {
  coursesList: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_USER_DATA:
      return updateObject(state, { coursesList: action.payload })
    case types.COURSE_SELECTED:
      const updatedCoursesList = [...state.coursesList]
      updatedCoursesList.map(course => {
        course.isSelected = course.ID === action.payload
      })
      return updateObject(state, { coursesList: updatedCoursesList })
    default: return state
  }
}