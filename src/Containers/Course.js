import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, TableHead, TableRow, TableCell, TableBody, withStyles, Typography } from '@material-ui/core';
import { convertAssignmentsToPercent } from '../store/util';

const styles = theme => {
  return {
    '@global': {
      body: {
        backgroundColor: theme.palette.common.white,
      },
    },
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    title: {
      marginBottom: theme.spacing(4),
      textAlign: 'center'
    }
  }
}

class Course extends Component {
  constructor(props) {
    super(props)
    const selectedCourseData = this.props.coursesList[this.props.selectedCourseID]
    this.state = {
      courseData: selectedCourseData
    }
  }

  render() {
    const { classes } = this.props
    const rows = []
    for (const key in this.state.courseData.categories) {
      const category = {
        ...this.state.courseData.categories[key],
        name: key
      }
      rows.push(
        <TableRow key={category.name}>
          <TableCell>{category.name}</TableCell>
          <TableCell>{category.weight}</TableCell>
          <TableCell>{convertAssignmentsToPercent(category.assignments) + '%'}</TableCell>
        </TableRow>)
    }

    return (
      <div className={classes.paper}>
        <Typography variant='h2' className={classes.title}>{this.state.courseData.title}</Typography>
        <Table >
          <TableHead className={classes.tableHead}>
            <TableRow>
              <TableCell>Category Name</TableCell>
              <TableCell>% of Final Grade</TableCell>
              <TableCell>Category Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows}
          </TableBody>

        </Table>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    selectedCourseID: state.ui.selectedCourseID,
    coursesList: state.data.coursesList
  }
}

const mapDispatchToProps = dispatch => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Course))