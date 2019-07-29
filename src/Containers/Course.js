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
  convertCategoriesToNumeric
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
          assignmentRows.push(
            <TableRow key={assignmentName}>
              <TableCell>{assignmentName}</TableCell>
              <TableCell>{category.assignments[assignmentName]}</TableCell>
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
      const categoryValue = convertAssignmentsToPercent(category.assignments);
      const displayValue =
        categoryValue === "NaN" ? "No Data" : categoryValue + "%";
      categoryRows.push(
        <Fragment key={category.name}>
          <TableRow>
            <TableCell>{category.name}</TableCell>
            <TableCell>{category.weight}</TableCell>
            <TableCell>
              <Button
                onClick={() => this.props.setSelectedCategory(category.name)}
              >
                {displayValue}
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
                      <TableCell>Score</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {assignmentRows}
                    <TableCell colSpan={3}>
                      <Button
                        onClick={() =>
                          this.props.setAddAssignmentDialogState(true)
                        }
                      >
                        Add an Assignment
                      </Button>
                    </TableCell>
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
    const displayGrade =
      numericGrade === "NaN" ? "No Grade Data" : numericGrade + "%";
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
              <TableCell>% of Final Grade</TableCell>
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
