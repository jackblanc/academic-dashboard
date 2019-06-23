import React, { Component } from 'react';

import { connect } from 'react-redux';
import * as actions from '../store/actions/index'

import {
  Grid, Typography, withStyles, Card, CardContent,
  CardActions, Button, IconButton
} from '@material-ui/core'
import { AddCircle } from '@material-ui/icons'

import { convertCategoriesToNumeric } from '../store/util'
import AddCourse from '../Components/AddCourse';

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
    },
    notecard: {
      padding: 40,
      margin: 10
    },
    addIcon: {
      width: '20%',
      height: '20%'
    },
    addCard: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }
  }
}

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.props.fetchUserData()
  }

  render() {
    const { classes } = this.props

    const courseNotecards = [];
    for (const courseID in this.props.coursesList) {
      const data = {
        ...this.props.coursesList[courseID],
        courseID
      }
      const numericGrade = convertCategoriesToNumeric(data.categories)
      const displayGrade = numericGrade === "NaN" ? "No Grade Data" : numericGrade + '%'
      courseNotecards.push(
        <Grid item xs key={courseID}>
          <Card className={classes.notecard}>
            <CardContent>
              <Typography variant='h4' >{data.title}</Typography>
              <Typography variant='h5' >{data.courseID}</Typography>
              <Typography variant='h6' >{"Current Grade: " + displayGrade}</Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                onClick={() => {
                  this.props.courseSelectedHandler(data.courseID)
                  this.props.history.push('/courses/' + data.courseID)
                }}>
                VIEW COURSE
              </Button>
            </CardActions>
          </Card>
        </Grid>)
    }

    let addCourseDialog = null;
    if (this.props.showAddCourseDialog) {
      addCourseDialog = <AddCourse />
    }


    return (
      <div className={classes.paper}>
        {addCourseDialog}
        <Typography variant='h1' className={classes.title}>All Courses</Typography>
        <Grid container justify="center" spacing={0}>
          {courseNotecards}
          <Grid item xs>
            <Card className={classes.notecard}>
              <CardContent className={classes.addCard}>
                <Typography variant='h4' >Add New Course</Typography>
                <IconButton onClick={() => this.props.setAddCourseDialogState(true)}>
                  <AddCircle className={classes.addIcon} />
                </IconButton>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    coursesList: state.data.coursesList,
    selectedCourseID: state.ui.selectedCourseID,
    showAddCourseDialog: state.ui.showAddCourseDialog
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUserData: () => dispatch(actions.fetchUserData()),
    courseSelectedHandler: (ID) => dispatch(actions.setSelectedCourse(ID)),
    setAddCourseDialogState: (boolean) => dispatch(actions.setAddCourseDialogState(boolean)),
    onAddCategory: (newCategory) => dispatch(actions.addCategoryToCourse(newCategory)),
    onEditCategory: (categoryName, newData) => dispatch(actions.editCategoryInCourse(categoryName, newData)),
    onRemoveCategory: (categoryName) => dispatch(actions.removeCategoryFromCourse(categoryName))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(Dashboard));