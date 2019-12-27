import React, { Component, Fragment } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
  withStyles,
  Checkbox,
  FormControlLabel,
  Box
} from "@material-ui/core";
import { connect } from "react-redux";
import * as actions from "../store/actions/index";
import DateSelect from "./DateSelect";

const styles = theme => {
  return {
    error: {
      color: theme.palette.error.main
    }
  };
};

class AddCourse extends Component {
  state = {
    assignmentName: "",
    pointsEarned: "",
    pointsPossible: "",
    isSubmitted: false,
    isGraded: false,
    dueDate: new Date(),
    dueTime: new Date()
  };

  render() {
    return (
      <Dialog
        open={this.props.showAddAssignmentDialog}
        onClose={() => this.props.setAddAssignmentDialogState(false)}
        maxWidth={"lg"}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add an Assignment</DialogTitle>
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
            autoComplete="off"
            value={this.state.assignmentName}
            onChange={event => {
              this.setState({
                ...this.state,
                assignmentName: event.target.value
              });
            }}
            error={this.props.error.assignmentNameError !== null}
            helperText={this.props.error.assignmentNameError}
          />
          <Box>
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.isSubmitted}
                  onChange={event => {
                    this.setState({
                      isSubmitted: event.target.checked
                    });
                  }}
                  value="isSubmitted"
                  color="primary"
                />
              }
              label="Assignment Submitted"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.isGraded}
                  onChange={event => {
                    this.setState({
                      isGraded: event.target.checked,
                      isSubmitted: event.target.checked
                    });
                  }}
                  value="isGraded"
                  color="primary"
                />
              }
              label="Assignment Graded"
            />
          </Box>
          {!this.state.isSubmitted && (
            <DateSelect
              dueDate={this.state.dueDate}
              dueTime={this.state.dueTime}
              handleChangeDueDate={newDate =>
                this.setState({ dueDate: newDate })
              }
              handleChangeDueTime={newTime =>
                this.setState({ dueTime: newTime })
              }
            />
          )}
          {this.state.isGraded && (
            <Fragment>
              <TextField
                margin="dense"
                id="pointsEarned"
                label="Points Earned"
                type="text"
                fullWidth
                autoComplete="off"
                value={this.state.pointsEarned}
                onChange={event => {
                  this.setState({
                    ...this.state,
                    pointsEarned: event.target.value
                  });
                }}
                error={this.props.error.pointsEarnedError !== null}
                helperText={this.props.error.pointsEarnedError}
              />
              <TextField
                margin="dense"
                id="pointsPossible"
                label="Points Possible"
                type="text"
                fullWidth
                autoComplete="off"
                value={this.state.pointsPossible}
                onChange={event => {
                  this.setState({
                    ...this.state,
                    pointsPossible: event.target.value
                  });
                }}
                error={this.props.error.pointsPossibleError !== null}
                helperText={this.props.error.pointsPossibleError}
              />
            </Fragment>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => this.props.setAddAssignmentDialogState(false)}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              this.submitHandler();
            }}
            color="primary"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  submitHandler = () => {
    this.props.addAssignment(
      this.state.assignmentName,
      this.state.pointsEarned,
      this.state.pointsPossible,
      this.state.dueDate,
      this.state.dueTime,
      this.state.isSubmitted,
      this.state.isGraded,
      this.props.courseID,
      this.props.categoryName
    );
  };
}

const mapStateToProps = state => {
  return {
    showAddAssignmentDialog: state.ui.showAddAssignmentDialog,
    courseID: state.ui.selectedCourseID,
    categoryName: state.ui.selectedCategoryName,
    error: state.data.addAssignmentError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setAddAssignmentDialogState: boolean =>
      dispatch(actions.setAddAssignmentDialogState(boolean)),
    addAssignment: (
      assignmentName,
      pointsEarned,
      pointsPossible,
      dueDate,
      dueTime,
      isSubmitted,
      isGraded,
      courseID,
      categoryName
    ) =>
      dispatch(
        actions.addAssignment(
          assignmentName,
          pointsEarned,
          pointsPossible,
          dueDate,
          dueTime,
          isSubmitted,
          isGraded,
          courseID,
          categoryName
        )
      )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AddCourse));
