import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  withStyles,
  Typography,
  Popover,
  Button,
  TextField,
  Block
} from "@material-ui/core";
import {
  convertAssignmentsToPercent,
  convertCategoriesToNumeric,
  percentageSignUtil
} from "../store/util";
import * as actions from "../store/actions/index";
import AddAssignment from "../Components/AddAssignment";
import { Check, NotInterested } from "@material-ui/icons";
import { POPOVER_ELEMENT_SWITCH } from "../constants";

const styles = theme => {
  return {
    "@global": {
      body: {
        backgroundColor: theme.palette.common.white
      }
    },
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    title: {
      marginBottom: theme.spacing(4),
      textAlign: "center"
    },
    popover: {
      margin: theme.spacing(2)
    }
  };
};

// TODO add due dates, make null values render better
// TODO add the ability to edit scores (or enter them if none given)
class Course extends Component {
  state = {
    anchorEl: null,
    pointsEarned: "",
    pointsPossible: "",
    selectedAssignmentName: ""
  };

  getStatus = assignment => {
    if (assignment.isGraded) {
      return "Assignment Graded";
    } else if (assignment.isSubmitted) {
      return "Assignment Submitted";
    } else {
      return "Assignment Incomplete";
    }
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    const anchorElID = this.state.anchorEl.id;
    this.setState({ anchorEl: null });
    switch (anchorElID) {
      case POPOVER_ELEMENT_SWITCH.CATEGORY_WEIGHT:
        // this.props.editAssignment(
        //   this.props.selectedCourseID,
        //   this.props.selectedCategoryName
        // );
        break;
      case POPOVER_ELEMENT_SWITCH.DISPLAY_GRADE:
        this.props.editAssignment(
          this.props.selectedCourseID,
          this.props.selectedCategoryName,
          this.state.selectedAssignmentName,
          "pointsEarned",
          this.state.pointsEarned
        );
        this.props.editAssignment(
          this.props.selectedCourseID,
          this.props.selectedCategoryName,
          this.state.selectedAssignmentName,
          "pointsPossible",
          this.state.pointsPossible
        );
        break;
    }
  };

  getAssignmentRows = () => {
    const {
      selectedCategoryName,
      removeAssignment,
      selectedCourseID,
      coursesList,
      editAssignment
    } = this.props;
    const category = {
      ...coursesList[selectedCourseID].categories[selectedCategoryName],
      name: selectedCategoryName
    };
    const assignmentRows = [];
    for (const assignmentName in category.assignments) {
      const {
        pointsEarned,
        pointsPossible,
        dueDate,
        isSubmitted
      } = category.assignments[assignmentName];
      const displayGrade =
        pointsEarned !== "Assignment not graded" ? (
          <Typography>
            {pointsEarned}/{pointsPossible}
          </Typography>
        ) : (
          "Enter grade"
        );

      assignmentRows.push(
        <TableRow key={assignmentName}>
          <TableCell>{assignmentName}</TableCell>
          <TableCell>
            <Button
              onClick={() => {
                editAssignment(
                  selectedCourseID,
                  selectedCategoryName,
                  assignmentName,
                  "isSubmitted",
                  !isSubmitted
                );
              }}
            >
              {isSubmitted ? <Check /> : <NotInterested />}
            </Button>
          </TableCell>
          <TableCell>
            {dueDate === null
              ? "Enter a due date"
              : new Date(dueDate).toLocaleString()}
          </TableCell>
          <TableCell>
            <Button
              onClick={event => {
                this.setState({ selectedAssignmentName: assignmentName });
                this.handleClick(event, POPOVER_ELEMENT_SWITCH.DISPLAY_GRADE);
              }}
              id={POPOVER_ELEMENT_SWITCH.DISPLAY_GRADE}
            >
              {displayGrade}
            </Button>
          </TableCell>
          <TableCell>
            <Button
              onClick={() => {
                removeAssignment(
                  assignmentName,
                  selectedCourseID,
                  selectedCategoryName
                );
              }}
            >
              Delete
            </Button>
          </TableCell>
        </TableRow>
      );
    }
    // TODO sort by due date, use dateCreated if due date null???
    return assignmentRows;
  };

  getCategoryRows = () => {
    const {
      selectedCategoryName,
      setSelectedCategory,
      setAddAssignmentDialogState,
      coursesList,
      selectedCourseID
    } = this.props;
    const categoryRows = [];
    for (const key in coursesList[selectedCourseID].categories) {
      const category = {
        ...coursesList[selectedCourseID].categories[key],
        name: key
      };

      const assignmentRows = this.getAssignmentRows();
      categoryRows.push(
        <Fragment key={category.name}>
          <TableRow>
            <TableCell>{category.name}</TableCell>
            <TableCell>
              <Button
                onClick={this.handleClick}
                id={POPOVER_ELEMENT_SWITCH.CATEGORY_WEIGHT}
              >
                {percentageSignUtil(category.weight)}
              </Button>
            </TableCell>
            <TableCell>
              <Button onClick={() => setSelectedCategory(category.name)}>
                {percentageSignUtil(
                  convertAssignmentsToPercent(category.assignments)
                )}
              </Button>
            </TableCell>
          </TableRow>
          {selectedCategoryName === category.name && (
            <TableRow>
              <TableCell colSpan={3}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Assignment Name</TableCell>
                      <TableCell>Submitted</TableCell>
                      <TableCell>Due Date</TableCell>
                      <TableCell>Score</TableCell>
                      <TableCell>Delete</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {assignmentRows}
                    <TableRow>
                      <TableCell colSpan={3}>
                        <Button
                          onClick={() => setAddAssignmentDialogState(true)}
                        >
                          Add an Assignment
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableCell>
            </TableRow>
          )}
        </Fragment>
      );
    }
    return categoryRows;
  };

  getPopoverContent = () => {
    if (this.state.anchorEl) {
      switch (this.state.anchorEl.id) {
        case POPOVER_ELEMENT_SWITCH.CATEGORY_WEIGHT:
          return null;
        // <TextField
        //   margin="dense"
        //   label="Category Weight"
        //   type="text"
        //   fullWidth
        //   autoComplete="off"
        //   value={this.state.editCategoryWeight}
        //   onChange={event => {
        //     this.setState({
        //       editCategoryWeight: event.target.value
        //     });
        //   }}
        //   // error={this.props.error.pointsPossibleError !== null}
        //   // helperText={this.props.error.pointsPossibleError}
        // />
        case POPOVER_ELEMENT_SWITCH.DISPLAY_GRADE:
          return (
            <React.Fragment>
              <TextField
                margin="dense"
                label="Points Earned"
                type="text"
                fullWidth
                autoComplete="off"
                value={this.state.pointsEarned}
                onChange={event => {
                  this.setState({
                    pointsEarned: event.target.value
                  });
                }}
                // error={this.props.error.pointsPossibleError !== null}
                // helperText={this.props.error.pointsPossibleError}
              />
              <TextField
                margin="dense"
                label="Points Possible"
                type="text"
                fullWidth
                autoComplete="off"
                value={this.state.pointsPossible}
                onChange={event => {
                  this.setState({
                    pointsPossible: event.target.value
                  });
                }}
                // error={this.props.error.pointsPossibleError !== null}
                // helperText={this.props.error.pointsPossibleError}
              />
            </React.Fragment>
          );
        default:
          return;
      }
    }
  };

  render() {
    const {
      classes,
      showAddAssignmentDialog,
      selectedCourseID,
      coursesList
    } = this.props;

    const categoryRows = this.getCategoryRows();
    return (
      <div className={classes.paper}>
        {showAddAssignmentDialog && <AddAssignment />}
        <Typography variant="h2" className={classes.title}>
          {coursesList[selectedCourseID].title}
        </Typography>
        <Typography variant="h4" className={classes.title}>
          {"Current Grade: " +
            percentageSignUtil(
              convertCategoriesToNumeric(
                coursesList[selectedCourseID].categories
              )
            )}
        </Typography>
        <Table>
          <TableHead className={classes.tableHead}>
            <TableRow>
              <TableCell>Category Name</TableCell>
              <TableCell>Category Weight</TableCell>
              <TableCell>Category Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{categoryRows}</TableBody>
        </Table>
        <Popover
          open={!!this.state.anchorEl}
          onClose={this.handleClose}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left"
          }}
        >
          <div className={classes.popover}>{this.getPopoverContent()}</div>
        </Popover>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedCourseID: state.ui.selectedCourseID,
    coursesList: state.data.coursesList,
    selectedCategoryName: state.ui.selectedCategoryName,
    showAddAssignmentDialog: state.ui.showAddAssignmentDialog
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setSelectedCategory: name =>
      dispatch(actions.setSelectedCategoryName(name)),
    setAddAssignmentDialogState: boolean =>
      dispatch(actions.setAddAssignmentDialogState(boolean)),
    removeAssignment: (name, courseID, categoryName) =>
      dispatch(actions.removeAssignment(name, courseID, categoryName)),
    editAssignment: (
      courseID,
      categoryName,
      assignmentName,
      fieldName,
      newValue
    ) =>
      dispatch(
        actions.editAssignment(
          courseID,
          categoryName,
          assignmentName,
          fieldName,
          newValue
        )
      )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Course));
