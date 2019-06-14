import React, { Component } from 'react';

import { connect } from 'react-redux';
import * as actions from '../store/actions/actions'

import { Grid } from '@material-ui/core'
import MaterialTable from 'material-table'

import CourseNotecard from '../Components/CourseNotecard'
import Loading from '../Components/UI/Loading'
import firebase from '../firebase';

const tableColumns = [
  { title: 'Category Name', field: 'category' },
  { title: 'Category Weight', field: 'weight', type: 'numeric' },
  { title: 'Category Value', field: 'value', type: 'numeric' },
]

const allCourseData = [
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

class Dashboard extends Component {

  render() {
    const coursesList = firebase.database().ref('/users/')
      .child(firebase.auth().currentUser.uid)
      .child('courseData')
      .once('value')
      .then(snap => {
        coursesList = snap.val()
        console.log(snap.val())
      });

    if (coursesList === null) {
      return (<Loading />)
    }

    let viewCourse = null
    // eslint-disable-next-line
    coursesList.map(course => {
      if (course.isSelected) {
        viewCourse =
          <MaterialTable // use nested rows to represent assignments
            title={course.title
              + ' - ' + course.numericGrade
              + '%, ' + course.letterGrade}
            columns={tableColumns}
            data={course.categories}
            editable={{
              onRowAdd: (newCategory) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    this.props.onAddCategory(newCategory)
                    this.props.saveData(this.props.token, this.props.allCourseData, this.props.userID)
                    resolve();
                  }, 1000);
                }),
              onRowUpdate: (newCategoryData, oldCategoryData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    this.props.onEditCategory(oldCategoryData.category, newCategoryData)
                    this.props.saveData(this.props.token, this.props.allCourseData, this.props.userID)
                    resolve();
                  }, 1000);
                }),
              onRowDelete: row =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    this.props.onRemoveCategory(row.category)
                    this.props.saveData(this.props.token, this.props.allCourseData, this.props.userID)
                    resolve();
                  }, 1000);
                }),
            }} />
      }
    })

    return (
      <div>
        <Grid container justify="center" spacing={0}>
          {this.props.allCourseData.map((data) => {
            return (
              <Grid item xs key={data.ID}>
                <CourseNotecard
                  data={data}
                  history={this.props.history}
                  match={this.props.match}
                  onButtonClick={(ID) => this.props.notecardClickedHandler(ID)}
                  selected={data.isSelected} />
              </Grid>)
          })}
        </Grid>
        {viewCourse}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    allCourseData: state.allCourseData,
    token: state.token,
    userID: state.userID,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddCategory: (category) => dispatch(actions.addCategory(category)),
    onRemoveCategory: (categoryName) => dispatch(actions.removeCategory(categoryName)),
    onEditCategory: (categoryName, newData) => dispatch(actions.editCategory(categoryName, newData)),
    notecardClickedHandler: (ID) => dispatch(actions.courseSelected(ID)),
    onFetchOrders: (token, userID) => dispatch(actions.fetchUserData(token, userID)),
    saveData: (token, data, userID) => dispatch(actions.saveUserData(token, data, userID))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);