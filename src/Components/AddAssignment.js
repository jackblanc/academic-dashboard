import React, { Component } from 'react'

import {
  Dialog, DialogTitle, DialogContent,
  DialogContentText, TextField, DialogActions,
  Button, withStyles, Typography
} from '@material-ui/core'

import { connect } from 'react-redux'
import * as actions from '../store/actions/index'

const styles = theme => {
  return {
    error: {
      color: theme.palette.error.main,
    }
  }
}

class AddCourse extends Component {
  state = {
    assignmentName: '',
    assignmentScore: '',
    error: null
  }

  render() {
    const { classes } = this.props

    return (
      <Dialog
        open={this.props.showAddAssignmentDialog}
        onClose={() => this.props.setAddAssignmentDialogState(false)}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add a Course</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the following data to add a new assignment to this category.
            </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Assignment Name"
            type="email"
            fullWidth
            autoComplete='off'
            value={this.state.assignmentName}
            onChange={(event) => {
              this.setState({
                ...this.state,
                assignmentName: event.target.value
              })
            }}
          />
          <TextField
            margin="dense"
            id="ID"
            label="Assignment Score (as a fraction)"
            type="text"
            fullWidth
            autoComplete='off'
            value={this.state.assignmentScore}
            onChange={(event) => {
              this.setState({
                ...this.state,
                assignmentScore: event.target.value
              })
            }}
          />
          <Typography className={classes.error}>{this.state.error}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.props.setAddAssignmentDialogState(false)} color="primary">
            Cancel
            </Button>
          <Button onClick={() => {
            this.submitHandler()
          }} color="primary">
            Submit
            </Button>
        </DialogActions>
      </Dialog>
    )
  }

  submitHandler = () => {
    if (this.state.assignmentName !== "" && this.state.assignmentScore !== "") {
      this.props.addAssignment(this.state.assignmentName, this.state.assignmentScore,
        this.props.courseID, this.props.categoryName)
      this.props.setAddAssignmentDialogState(false)
      this.setState({ error: null })
    } else {
      this.setState({ error: "Error! Inputs cannot be empty" })
    }
  }
}

const mapStateToProps = state => {
  return {
    showAddAssignmentDialog: state.ui.showAddAssignmentDialog,
    courseID: state.ui.selectedCourseID,
    categoryName: state.ui.selectedCategoryName
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setAddAssignmentDialogState: (boolean) => dispatch(actions.setAddAssignmentDialogState(boolean)),
    addAssignment: (assignmentName, assignmentScore, courseID, categoryName) =>
      dispatch(actions.addAssignment(assignmentName, assignmentScore, courseID, categoryName))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AddCourse))