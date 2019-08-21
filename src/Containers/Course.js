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
  Button
} from "@material-ui/core";
import {
  convertAssignmentsToPercent,
  convertCategoriesToNumeric,
  percentageSignUtil
} from "../store/util";
import * as actions from "../store/actions/index";
import AddAssignment from "../Components/AddAssignment";

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
    }
  };
};

// TODO add due dates, make null values render better
// TODO add the ability to edit scores (or enter them if none given)
class Course extends Component {
  render() {
    const { classes } = this.props;
    const categoryRows = [];

    let addAssignmentDialog = null;
    if (this.props.showAddAssignmentDialog) {
      addAssignmentDialog = <AddAssignment />;
    }

    for (const key in this.props.coursesList[this.props.selectedCourseID]
      .categories) {
      const category = {
        ...this.props.coursesList[this.props.selectedCourseID].categories[key],
        name: key
      };

      const assignmentRows = [];
      if (this.props.selectedCategoryName) {
        for (const assignmentName in category.assignments) {
          const displayGrade =
            category.assignments[assignmentName].pointsEarned !==
            "Assignment not graded" ? (
              <Typography>
                {category.assignments[assignmentName].pointsEarned}/
                {category.assignments[assignmentName].pointsPossible}
              </Typography>
            ) : (
              "Enter grade"
            );
          assignmentRows.push(
            <TableRow key={assignmentName}>
              <TableCell>{assignmentName}</TableCell>
              <TableCell>
                {category.assignments[assignmentName].dueDate === undefined
                  ? "Enter a due date"
                  : new Date(
                      category.assignments[assignmentName].dueDate
                    ).toLocaleString()}
              </TableCell>
              <TableCell>{displayGrade}</TableCell>
              <TableCell>
                <Button
                  onClick={() => {
                    this.props.removeAssignment(
                      assignmentName,
                      this.props.selectedCourseID,
                      this.props.selectedCategoryName
                    );
                  }}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          );
        }
      }
      const categoryValue = percentageSignUtil(
        convertAssignmentsToPercent(category.assignments)
      );
      categoryRows.push(
        <Fragment key={category.name}>
          <TableRow>
            <TableCell>{category.name}</TableCell>
            <TableCell>{percentageSignUtil(category.weight)}</TableCell>
            <TableCell>
              <Button
                onClick={() => this.props.setSelectedCategory(category.name)}
              >
                {categoryValue}
              </Button>
            </TableCell>
          </TableRow>
          {this.props.selectedCategoryName === category.name ? (
            <TableRow>
              <TableCell colSpan={3}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Assignment Name</TableCell>
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
                          onClick={() =>
                            this.props.setAddAssignmentDialogState(true)
                          }
                        >
                          Add an Assignment
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableCell>
            </TableRow>
          ) : null}
        </Fragment>
      );
    }

    const numericGrade = convertCategoriesToNumeric(
      this.props.coursesList[this.props.selectedCourseID].categories
    );
    const displayGrade = percentageSignUtil(numericGrade);
    return (
      <div className={classes.paper}>
        {addAssignmentDialog}
        <Typography variant="h2" className={classes.title}>
          {this.props.coursesList[this.props.selectedCourseID].title}
        </Typography>
        <Typography variant="h4" className={classes.title}>
          {"Current Grade: " + displayGrade}
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
      dispatch(actions.removeAssignment(name, courseID, categoryName))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Course));
