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
    for (const courseName in this.props.coursesList) {
      const categories = this.props.coursesList[courseName].categories;
      for (const category in categories) {
        const assignments = categories[category].assignments;
        for (const assignmentName in assignments) {
          const assignmentData = {
            ...assignments[assignmentName],
            assignmentName,
            courseName
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
    <TableRow>
      <TableCell>
        <Button>
          {assignment.assignmentComplete ? <Check /> : <NotInterested />}
        </Button>
      </TableCell>
      <TableCell>
        {assignment.assignmentSubmitted ? <Check /> : <NotInterested />}
      </TableCell>
      <TableCell>{assignment.assignmentName}</TableCell>
      <TableCell>{assignment.courseName}</TableCell>
      <TableCell>{new Date(assignment.dueDate).toLocaleString()}</TableCell>
    </TableRow>
  );

  render() {
    const { classes } = this.props;
    const { showSubmittedAssignments } = this.state;

    const assignmentList = this.getAssignmentList();
    console.log(assignmentList);

    return (
      <div className={classes.paper}>
        <Typography variant="h2" className={classes.title}>
          Todo List
        </Typography>
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

export default connect(mapStateToProps)(withStyles(styles)(Todo));
