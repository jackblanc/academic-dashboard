// TODO implement validation using redux

import React, { Component, Fragment } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
  Grid,
  withStyles,
  Typography
} from "@material-ui/core";

import { connect } from "react-redux";
import * as actions from "../store/actions/index";

const styles = theme => {
  return {
    error: {
      color: theme.palette.error.main
    },
    invalidInput: {
      color: theme.palette.error.main
    }
  };
};

class AddCourse extends Component {
  state = {
    courseName: "",
    courseID: "",
    credits: null,
    categories: [
      {
        name: "",
        weight: ""
      },
      {
        name: "",
        weight: ""
      }
    ],
    nameIDPage: true,
    categoriesPage: false,
    numCategories: 4,
    error: null
  };

  render() {
    const { classes } = this.props;

    let page = null;
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
              autoComplete="off"
              value={this.state.courseName}
              onChange={event => {
                this.setState({
                  ...this.state,
                  courseName: event.target.value
                });
              }}
            />
            <TextField
              margin="dense"
              id="ID"
              label="Course ID"
              type="text"
              fullWidth
              autoComplete="off"
              value={this.state.courseID}
              onChange={event => {
                this.setState({
                  ...this.state,
                  courseID: event.target.value
                });
              }}
            />
            <TextField
              margin="dense"
              id="Credits"
              label="# of Credits"
              type="text"
              fullWidth
              autoComplete="off"
              value={this.state.credits}
              onChange={event => {
                this.setState({
                  ...this.state,
                  credits: event.target.value
                });
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => this.props.setAddCourseDialogState(false)}
              color="primary"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                this.setState({ nameIDPage: false, categoriesPage: true });
              }}
              color="primary"
            >
              Next
            </Button>
          </DialogActions>
        </Fragment>
      );
    } else if (this.state.categoriesPage) {
      page = (
        <Fragment>
          <DialogContent className={classes.content}>
            <DialogContentText>
              Enter the grading schema for this course. Example: Quizzes count
              for 20% of final grade, Tests for 30%, etc... sum to 100% please
            </DialogContentText>
            <Grid container justify="center" spacing="2">
              {this.state.categories.map((category, index) => {
                return (
                  <Fragment key={index}>
                    <Grid item>
                      <TextField
                        label={"Category Name"}
                        className={classes.input}
                        value={this.state.categories[index].name}
                        onChange={event => {
                          const newCategories = this.state.categories.map(
                            (category, idx) => {
                              if (index !== idx) return category;
                              return { ...category, name: event.target.value };
                            }
                          );
                          this.setState({ categories: newCategories });
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        label={"Category Weight"}
                        className={classes.input}
                        value={this.state.categories[index].weight}
                        onChange={event => {
                          const newCategories = this.state.categories.map(
                            (category, idx) => {
                              if (index !== idx) return category;
                              return {
                                ...category,
                                weight: event.target.value
                              };
                            }
                          );
                          this.setState({ categories: newCategories });
                        }}
                      />
                    </Grid>
                  </Fragment>
                );
              })}
            </Grid>
            <Button
              onClick={() => {
                if (this.state.categories.length > 1) {
                  const copy = [...this.state.categories];
                  copy.pop();
                  this.setState({ categories: copy });
                }
              }}
              className={classes.addCategoryButton}
            >
              Remove Category
            </Button>
            <Button
              onClick={() => {
                this.setState({
                  categories: this.state.categories.concat([
                    { name: "", weight: "" }
                  ])
                });
              }}
              className={classes.addCategoryButton}
            >
              Add Category
            </Button>
            <Typography className={classes.error}>
              {this.state.error}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                this.setState({ nameIDPage: true, categoriesPage: false });
              }}
              color="primary"
            >
              Previous
            </Button>
            <Button onClick={() => this.submitHandler()} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Fragment>
      );
    }
    return (
      <Dialog
        open={this.props.showAddCourseDialog}
        onClose={() => this.props.setAddCourseDialogState(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add a Course</DialogTitle>
        {page}
      </Dialog>
    );
  }

  submitHandler = () => {
    let sumWeights = 0;
    let flag = false;
    const newCategories = this.state.categories.reduce((obj, item) => {
      if (item.name === "") {
        flag = true;
      }
      obj[item.name] = {
        weight: parseInt(item.weight)
      };
      sumWeights += parseInt(item.weight);
      return obj;
    }, {});

    console.log(sumWeights);
    console.log(flag);
    const course = {
      title: this.state.courseName,
      credits: this.state.credits,
      categories: {
        ...newCategories
      }
    };
    if (sumWeights !== 100) {
      this.setState({ error: "Error! Weights must sum to 100%" });
    } else if (
      this.state.courseID === "" ||
      course.categories === null ||
      course.title === "" ||
      course.credits === null
    ) {
      this.setState({ error: "Error! Inputs cannot be empty" });
    } else if (flag === true) {
      this.setState({ error: "Error! Category names cannot be empty" });
    } else {
      this.setState({ error: null });
      this.props.addCourse(this.state.courseID, course);
      this.props.setAddCourseDialogState(false);
    }
  };
}

const mapStateToProps = state => {
  return {
    showAddCourseDialog: state.ui.showAddCourseDialog
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setAddCourseDialogState: boolean =>
      dispatch(actions.setAddCourseDialogState(boolean)),
    addCourse: (courseID, courseData) =>
      dispatch(actions.addCourse(courseID, courseData))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AddCourse));
