import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import {
  Typography,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Button
} from "@material-ui/core";
import { Check, NotInterested } from "@material-ui/icons";
import * as actions from "../store/actions";

const styles = theme => {
  return {
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper
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

class Todo extends Component {
  state = {
    showSubmittedAssignments: false
  };

  getAssignmentList = () => {
    const assignmentList = [];
    for (const courseID in this.props.coursesList) {
      const categories = this.props.coursesList[courseID].categories;
      for (const categoryName in categories) {
        const assignments = categories[categoryName].assignments;
        for (const assignmentName in assignments) {
          const assignmentData = {
            ...assignments[assignmentName],
            assignmentName,
            categoryName,
            courseID
          };
          assignmentList.push(assignmentData);
        }
      }
    }
    assignmentList.sort((a, b) => {
      const dateA = new Date(a.dueDate);
      const dateB = new Date(b.dueDate);
      return dateA.getTime() - dateB.getTime();
    });
    return assignmentList;
  };

  getAssignmentRow = assignment => (
    <TableRow
      key={
        assignment.assignmentName +
        assignment.courseID +
        assignment.categoryName
      }
    >
      <TableCell>
        <Button
          onClick={() => {
            this.props.editAssignment(
              assignment.courseID,
              assignment.categoryName,
              assignment.assignmentName,
              "assignmentComplete",
              !assignment.assignmentComplete
            );
          }}
        >
          {assignment.assignmentComplete ? <Check /> : <NotInterested />}
        </Button>
      </TableCell>
      <TableCell>
        <Button
          onClick={() => {
            this.props.editAssignment(
              assignment.courseID,
              assignment.categoryName,
              assignment.assignmentName,
              "assignmentSubmitted",
              !assignment.assignmentSubmitted
            );
            this.props.editAssignment(
              assignment.courseID,
              assignment.categoryName,
              assignment.assignmentName,
              "assignmentComplete",
              !assignment.assignmentComplete
            );
          }}
        >
          {assignment.assignmentSubmitted ? <Check /> : <NotInterested />}
        </Button>
      </TableCell>
      <TableCell>{assignment.assignmentName}</TableCell>
      <TableCell>{assignment.courseID}</TableCell>
      <TableCell>{new Date(assignment.dueDate).toLocaleString()}</TableCell>
    </TableRow>
  );

  render() {
    const { classes } = this.props;
    const { showSubmittedAssignments } = this.state;

    const assignmentList = this.getAssignmentList();

    return (
      <div className={classes.paper}>
        <Typography variant="h2" className={classes.title}>
          Todo List
        </Typography>
        <Button
          onClick={() =>
            this.setState(prevState => ({
              showSubmittedAssignments: !prevState.showSubmittedAssignments
            }))
          }
        >
          {showSubmittedAssignments
            ? "Hide Submitted Assignments"
            : "Show Submitted Assignments"}
        </Button>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Complete</TableCell>
              <TableCell>Submitted</TableCell>
              <TableCell>Assignment Name</TableCell>
              <TableCell>Course Name</TableCell>
              <TableCell>Due Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {assignmentList.map(assignment => {
              if (
                (assignment.assignmentSubmitted && showSubmittedAssignments) ||
                !assignment.assignmentSubmitted
              ) {
                return this.getAssignmentRow(assignment);
              } else {
                return null;
              }
            })}
          </TableBody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    coursesList: state.data.coursesList
  };
};

const mapDispatchToProps = dispatch => {
  return {
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
)(withStyles(styles)(Todo));
