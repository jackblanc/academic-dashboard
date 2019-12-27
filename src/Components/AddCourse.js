// TODO implement validation using redux

import React, { Component } from "react";

import {
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
  Grid,
  withStyles,
  Typography
} from "@material-ui/core";

import ResponsiveModal from "../Components/ResponsiveModal";

import { connect } from "react-redux";
import * as actions from "../store/actions/index";

const styles = theme => {
  return {
    error: {
      color: theme.palette.error.main,
      textAlign: "center",
      marginTop: theme.spacing(4)
    },
    addRemoveCategoryButtonContainer: {
      "margin-top": "5%"
    }
  };
};

class AddCourse extends Component {
  state = {
    courseName: "",
    courseID: "",
    credits: "",
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
    showFirstPage: true,
    error: ""
  };

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

  render() {
    const {
      classes,
      showAddCourseDialog,
      setAddCourseDialogState
    } = this.props;
    const {
      showFirstPage,
      courseName,
      courseID,
      credits,
      categories,
      error
    } = this.state;
    return (
      <ResponsiveModal
        open={showAddCourseDialog}
        onClose={() => setAddCourseDialogState(false)}
        title={"Add a Course"}
      >
        {showFirstPage ? (
          <>
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
                value={courseName}
                onChange={event =>
                  this.setState({
                    courseName: event.target.value
                  })
                }
              />
              <TextField
                margin="dense"
                id="ID"
                label="Course ID"
                type="text"
                fullWidth
                autoComplete="off"
                value={courseID}
                onChange={event =>
                  this.setState({
                    courseID: event.target.value
                  })
                }
              />
              <TextField
                margin="dense"
                id="Credits"
                label="# of Credits"
                type="text"
                fullWidth
                autoComplete="off"
                value={credits}
                onChange={event =>
                  this.setState({
                    credits: event.target.value
                  })
                }
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => setAddCourseDialogState(false)}
                color="primary"
              >
                Cancel
              </Button>
              <Button
                onClick={() => this.setState({ showFirstPage: false })}
                color="primary"
              >
                Next
              </Button>
            </DialogActions>
          </>
        ) : (
          <>
            <DialogContent className={classes.content}>
              <DialogContentText>
                Enter the grading schema for this course. Example: Quizzes count
                for 20% of final grade, Tests for 30%, etc... sum to 100% please
              </DialogContentText>
              <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
                spacing={3}
              >
                {categories.map((category, index) => {
                  return (
                    <Grid item key={category + index} xs={12}>
                      <TextField
                        label={"Category Name"}
                        value={categories[index].name}
                        fullWidth
                        onChange={event => {
                          const newCategories = categories.map(
                            (category, idx) => {
                              if (index !== idx) return category;
                              return {
                                ...category,
                                name: event.target.value
                              };
                            }
                          );
                          this.setState({ categories: newCategories });
                        }}
                      />
                      <TextField
                        label={"Category Weight"}
                        value={categories[index].weight}
                        fullWidth
                        onChange={event => {
                          const newCategories = categories.map(
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
                  );
                })}
              </Grid>
              <Grid
                container
                justify="center"
                spacing={2}
                className={classes.addRemoveCategoryButtonContainer}
              >
                <Button
                  onClick={() => {
                    if (categories.length > 1) {
                      const copy = [...categories];
                      copy.pop();
                      this.setState({ categories: copy });
                    }
                  }}
                  className={classes.addCategoryButton}
                >
                  Remove Category
                </Button>
                <Button
                  onClick={() =>
                    this.setState({
                      categories: categories.concat([{ name: "", weight: "" }])
                    })
                  }
                  className={classes.addCategoryButton}
                >
                  Add Category
                </Button>
              </Grid>
              {error && (
                <Typography className={classes.error}>{error}</Typography>
              )}
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => this.setState({ showFirstPage: true })}
                color="primary"
              >
                Previous
              </Button>
              <Button onClick={this.submitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </>
        )}
      </ResponsiveModal>
    );
  }
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
