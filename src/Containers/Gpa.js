import React, { Component } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Typography,
  withStyles
} from "@material-ui/core";
import { connect } from "react-redux";
import {
  convertCategoriesToNumeric,
  convertNumericGradeToGPA,
  calculateGPA,
  percentageSignUtil
} from "../store/util";

// TODO NaN with no courses

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

class Gpa extends Component {
  render() {
    const { classes } = this.props;
    const courseTableBody = [];
    for (let key in this.props.coursesList) {
      const course = this.props.coursesList[key];
      const courseGPA = convertNumericGradeToGPA(
        convertCategoriesToNumeric(course.categories)
      );
      courseTableBody.push(
        <TableRow key={key}>
          <TableCell>{course.title}</TableCell>
          <TableCell>
            {percentageSignUtil(convertCategoriesToNumeric(course.categories))}
          </TableCell>
          <TableCell>
            {!isNaN(courseGPA) ? courseGPA.toFixed(2) : "Not Applicable"}
          </TableCell>
          <TableCell>{course.credits}</TableCell>
        </TableRow>
      );
    }
    return (
      <div className={classes.paper}>
        <Typography variant="h2" className={classes.title}>
          GPA
        </Typography>
        <Typography variant="h4" className={classes.title}>
          Current Semester GPA:{" "}
          {calculateGPA(this.props.coursesList).toFixed(2)}
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Course Name</TableCell>
              <TableCell>Course Grade</TableCell>
              <TableCell>Corresponding GPA</TableCell>
              <TableCell># of Credits</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{courseTableBody}</TableBody>
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
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Gpa));
