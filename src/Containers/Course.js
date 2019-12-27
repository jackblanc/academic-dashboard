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
  TextField
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
import DateSelect from "../Components/DateSelect";

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

class Course extends Component {
  state = {
    anchorEl: null,
    pointsEarned: "",
    pointsPossible: "",
    selectedAssignmentName: "",
    selectedCategoryName: "",
    categoryWeight: "",
    dueDate: new Date(),
    dueTime: new Date()
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    const { editCategory, editAssignment, selectedCourseID } = this.props;
    const {
      anchorEl,
      selectedAssignmentName,
      selectedCategoryName,
      categoryWeight,
      pointsEarned,
      pointsPossible,
      dueDate,
      dueTime
    } = this.state;
    switch (anchorEl.id) {
      case POPOVER_ELEMENT_SWITCH.CATEGORY_WEIGHT:
        editCategory(
          selectedCourseID,
          selectedCategoryName,
          "weight",
          parseFloat(categoryWeight === "" ? 0 : categoryWeight)
        );
        this.setState({ categoryWeight: "" });
        break;
      case POPOVER_ELEMENT_SWITCH.DISPLAY_GRADE:
        editAssignment(
          selectedCourseID,
          selectedCategoryName,
          selectedAssignmentName,
          "pointsEarned",
          pointsEarned === "" ? "Assignment not graded" : pointsEarned
        );
        editAssignment(
          selectedCourseID,
          selectedCategoryName,
          selectedAssignmentName,
          "pointsPossible",
          pointsPossible === "" ? "Assignment not graded" : pointsPossible
        );
        this.setState({
          pointsEarned: "",
          pointsPossible: ""
        });
        break;
      case POPOVER_ELEMENT_SWITCH.DUE_DATE:
        if (!dueDate || !dueTime) {
          break;
        }
        const combinedDueDateTime = new Date(
          dueDate.getFullYear(),
          dueDate.getMonth(),
          dueDate.getDate(),
          dueTime.getHours(),
          dueTime.getMinutes(),
          dueTime.getSeconds()
        ).toISOString();
        editAssignment(
          selectedCourseID,
          selectedCategoryName,
          selectedAssignmentName,
          "dueDate",
          combinedDueDateTime
        );
        break;
      default:
        return null;
    }
    this.setState({ anchorEl: null });
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
            <Button
              onClick={event => {
                this.setState({
                  dueDate: dueDate,
                  selectedAssignmentName: assignmentName
                });
                this.handleClick(event, POPOVER_ELEMENT_SWITCH.DUE_DATE);
              }}
              id={POPOVER_ELEMENT_SWITCH.DUE_DATE}
            >
              {dueDate === null || isNaN(Date.parse(dueDate))
                ? "Enter a due date"
                : new Date(dueDate).toLocaleTimeString() +
                  " " +
                  new Date(dueDate).toDateString()}
            </Button>
          </TableCell>
          <TableCell>
            <Button
              onClick={event => {
                this.setState({
                  selectedAssignmentName: assignmentName,
                  pointsEarned: pointsEarned,
                  pointsPossible: pointsPossible
                });
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
                onClick={event => {
                  this.setState({
                    selectedCategoryName: category.name,
                    categoryWeight: category.weight
                  });
                  this.handleClick(event);
                }}
                id={POPOVER_ELEMENT_SWITCH.CATEGORY_WEIGHT}
              >
                {percentageSignUtil(category.weight)}
              </Button>
            </TableCell>
            <TableCell>
              <Button
                onClick={() => {
                  this.setState({ selectedCategoryName: category.name });
                  setSelectedCategory(category.name);
                }}
              >
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
        case POPOVER_ELEMENT_SWITCH.DUE_DATE:
          return (
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
          );
        case POPOVER_ELEMENT_SWITCH.CATEGORY_WEIGHT:
          return (
            <TextField
              margin="dense"
              label="Category Weight"
              type="text"
              fullWidth
              autoComplete="off"
              value={this.state.categoryWeight}
              onChange={event => {
                this.setState({
                  categoryWeight: event.target.value
                });
              }}
            />
          );
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

    let sumWeights = 0;
    const categoryList = coursesList[selectedCourseID].categories;
    for (const category in categoryList) {
      sumWeights += categoryList[category].weight;
    }
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
        <Typography variant="h6" color="error">
          {sumWeights !== 100 &&
            "Error: Category weights must sum to 100% (current value: " +
              sumWeights +
              "%)"}
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
      ),
    editCategory: (courseID, categoryName, fieldName, newValue) =>
      dispatch(
        actions.editCategory(courseID, categoryName, fieldName, newValue)
      )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Course));
