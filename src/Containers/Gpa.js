import React, { Component } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell
} from "@material-ui/core";

import { connect } from "react-redux";
import { convertCategoriesToNumeric } from "../store/util";

class Gpa extends Component {
  render() {
    const courseTableBody = [];
    for (let key in this.props.coursesList) {
      console.log(key);
      console.log(this.props.coursesList[key]);
      const course = this.props.coursesList[key];
      courseTableBody.push(
        <TableRow key={key}>
          <TableCell>{course.title}</TableCell>
          <TableCell>
            {convertCategoriesToNumeric(course.categories) === "NaN"
              ? "No Data"
              : convertCategoriesToNumeric(course.categories) + "%"}
          </TableCell>
          <TableCell>{course.credits}</TableCell>
        </TableRow>
      );
    }
    return (
      <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Course</TableCell>
              <TableCell>Grade</TableCell>
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
)(Gpa);
