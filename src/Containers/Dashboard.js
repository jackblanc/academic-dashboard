import React, { Component } from 'react';

import { connect } from 'react-redux';
import * as actions from '../store/actions/index'

import { Grid, Typography, Button } from '@material-ui/core'
import MaterialTable from 'material-table'

import CourseNotecard from '../Components/CourseNotecard'
import Loading from '../Components/UI/Loading'

const tableColumns = [
  { title: 'Category Name', field: 'category' },
  { title: 'Category Weight', field: 'weight', type: 'numeric' },
  { title: 'Category Value', field: 'value', type: 'numeric' },
]

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.props.fetchUserData()
  }

  render() {
    if (this.props.coursesList === null) {
      return <Loading />
    }

    let viewCourse = null
    this.props.coursesList.map(course => {
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
                    resolve();
                  }, 1000);
                }),
              onRowUpdate: (newCategoryData, oldCategoryData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    this.props.onEditCategory(oldCategoryData.category, newCategoryData)
                    resolve();
                  }, 1000);
                }),
              onRowDelete: row =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    this.props.onRemoveCategory(row.category)
                    resolve();
                  }, 1000);
                }),
            }} />
      }
    })

    return (
      <div>
        <Grid container justify="center" spacing={0}>
          {this.props.coursesList.map((data) => {
            return (
              <Grid item xs key={data.ID}>
                <CourseNotecard
                  data={data}
                  history={this.props.history}
                  match={this.props.match}
                  onButtonClick={(ID) => this.props.courseSelectedHandler(ID)}
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
    coursesList: state.data.coursesList
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUserData: () => dispatch(actions.fetchUserData()),
    courseSelectedHandler: (ID) => dispatch(actions.courseSelectedHandler(ID))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);