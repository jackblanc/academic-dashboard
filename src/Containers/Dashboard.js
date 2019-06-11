import React, { Component } from 'react';

import { connect } from 'react-redux';
import * as actions from '../store/actions'

import { Grid } from '@material-ui/core'
import MaterialTable from 'material-table'

import CourseNotecard from '../Components/CourseNotecard'
import Loading from '../Components/UI/Loading'

const tableColumns = [
  { title: 'Category Name', field: 'category' },
  { title: 'Category Weight', field: 'weight', type: 'numeric' },
  { title: 'Category Value', field: 'value', type: 'numeric' },
]
class Dashboard extends Component {

  render() {
    if (this.props.token && !this.props.allCourseData) {
      this.props.onFetchOrders(this.props.token, this.props.userID)
    }

    let viewCourse = null
    if (!this.props.allCourseData) {
      return (<Loading />)
    }
    // eslint-disable-next-line
    this.props.allCourseData.map(course => {
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