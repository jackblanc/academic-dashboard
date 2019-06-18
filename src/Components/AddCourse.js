import React, { Component, Fragment } from 'react'

import {
  Dialog, DialogTitle, DialogContent,
  DialogContentText, TextField, DialogActions,
  Button, Grid
} from '@material-ui/core'

import { connect } from 'react-redux'
import * as actions from '../store/actions/index'

class AddCourse extends Component {
  state = {
    courseName: "",
    courseID: "",
    categories: [{
      name: "",
      weight: ""
    }],
    nameIDPage: true,
    categoriesPage: false,
    numCategories: 4
  }

  render() {
    let page = null
    if (this.state.nameIDPage) {
      page = (
        <Fragment>
          <DialogContent>
            <DialogContentText>
              Enter the following data to add a new course to your dashboard.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Course Name"
              type="email"
              fullWidth
              autoComplete='off'
              value={this.state.courseName}
              onChange={(event) => {
                this.setState({
                  ...this.state,
                  courseName: event.target.value
                })
              }}
            />
            <TextField
              margin="dense"
              id="ID"
              label="Course ID (must be unique)"
              type="text"
              fullWidth
              autoComplete='off'
              value={this.state.courseID}
              onChange={(event) => {
                this.setState({
                  ...this.state,
                  courseID: event.target.value
                })
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.props.setAddCourseDialogState(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={() => {
              this.setState({ nameIDPage: false, categoriesPage: true })
            }} color="primary">
              Next
            </Button>
          </DialogActions>
        </Fragment>
      )
    } else if (this.state.categoriesPage) {
      page = (
        <Fragment>
          <DialogContent>
            <DialogContentText>
              Enter the grading schema for this course.
              Example: Quizzes count for 20% of final grade, Tests for 30%, etc... sum to 100% please
            </DialogContentText>
            <Grid container justify='center'>
              {this.state.categories.map((category, index) => {
                return (
                  <Fragment key={index}>
                    <Grid item>
                      <TextField
                        margin="dense"
                        id="name"
                        label="Category Name"
                        type="email"
                        fullWidth
                        autoComplete='off'
                        value={this.state.categories[index].name}
                        onChange={(event) => {
                          const newCategories = this.state.categories.map((category, idx) => {
                            if (index !== idx) return category;
                            return { ...category, name: event.target.value };
                          });
                          this.setState({ categories: newCategories });
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        margin="dense"
                        id="name"
                        label="Category Weight"
                        type="email"
                        fullWidth
                        autoComplete='off'
                        onChange={(event) => {
                          const newCategories = this.state.categories.map((category, idx) => {
                            if (index !== idx) return category;
                            return { ...category, weight: event.target.value };
                          });
                          this.setState({ categories: newCategories });
                        }}
                      />
                    </Grid>
                  </Fragment>)
              })}
            </Grid>
            <Button onClick={() => {
              this.setState({ categories: this.state.categories.concat([{ name: '', weight: '' }]) })
            }} style={{ alignContent: 'right' }}>Add Category</Button>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.props.setAddCourseDialogState(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={() => this.submitHandler()} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Fragment>
      )
    }
    return (
      <Dialog
        open={this.props.showAddCourseDialog}
        onClose={() => this.props.setAddCourseDialogState(false)}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add a Course</DialogTitle>
        {page}
      </Dialog>
    )
  }

  submitHandler = () => {
    const newCategories = this.state.categories.reduce((obj, item) => {
      obj[item.name] = {
        weight: parseInt(item.weight)
      }
      return obj
    }, {})

    const course = {
      title: this.state.courseName,
      categories: {
        ...newCategories
      }
    }

    this.props.addCourse(this.state.courseID, course)
    this.props.setAddCourseDialogState(false)
  }
}

const mapStateToProps = state => {
  return {
    showAddCourseDialog: state.ui.showAddCourseDialog
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setAddCourseDialogState: (boolean) => dispatch(actions.setAddCourseDialogState(boolean)),
    addCourse: (courseID, courseData) => dispatch(actions.addCourse(courseID, courseData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCourse)