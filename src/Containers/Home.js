import React from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions/index";
import {
  Grid,
  Typography,
  withStyles,
  Card,
  CardContent,
  CardActions,
  Button
} from "@material-ui/core";
import { convertCategoriesToNumeric, percentageSignUtil } from "../store/util";
import AddCourse from "../Components/AddCourse";

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
      textAlign: "left"
    },
    sectionTitle: {
      marginTop: theme.spacing(4),
      textAlign: "left"
    },
    card: {
      width: 275,
      // TODO: make 100% width work on courses. Issue with mapping I believe.
      [theme.breakpoints.down("xs")]: {
        width: "100%"
      }
    },
    page: {
      [theme.breakpoints.up("md")]: {
        marginLeft: theme.spacing(10),
        marginRight: theme.spacing(10)
      },
      [theme.breakpoints.down("md")]: {
        marginLeft: theme.spacing(2)
      }
    }
  };
};

const Home = ({
  classes,
  coursesList,
  showAddCourseDialog,
  setAddCourseDialogState,
  courseSelectedHandler,
  history
}) => (
  <div className={classes.page}>
    <div className={classes.paper}>
      <Typography variant="h1" className={classes.title}>
        Academic Dashboard
      </Typography>
      <Typography variant="subtitle1" color="textSecondary">
        Welcome to your new academic planner, DASH: built by a student, for
        students
      </Typography>
    </div>
    {coursesList && (
      <>
        <Typography variant="h4" className={classes.sectionTitle} gutterBottom>
          View Your Courses:
        </Typography>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
          spacing={3}
          xs={12}
        >
          {Object.entries(coursesList).map(([courseID, course]) => (
            <Grid item key={courseID}>
              <Card className={classes.card}>
                <CardContent>
                  <Typography variant="h4">{course.title}</Typography>
                  <Typography variant="h5">{courseID}</Typography>
                  <Typography variant="h6">
                    {"Current Grade: " +
                      percentageSignUtil(
                        convertCategoriesToNumeric(course.categories)
                      )}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    onClick={() => {
                      courseSelectedHandler(courseID);
                      history.push("/courses/" + courseID);
                    }}
                  >
                    VIEW COURSE
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </>
    )}
    <Typography variant="h4" className={classes.sectionTitle} gutterBottom>
      Build your DASH:
    </Typography>
    <Grid
      container
      direction="row"
      justify="flex-start"
      alignItems="center"
      spacing={3}
      xs={12}
    >
      <Grid item>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h5" component="h2">
              Create a New Course
            </Typography>
            {coursesList ? (
              <Typography variant="body2" component="p">
                Add a new course to your DASH to get all of your upcoming
                assignments and grades in one place
              </Typography>
            ) : (
              <Typography variant="body2" component="p">
                Click the button below to add your first course to DASH!
              </Typography>
            )}
          </CardContent>
          <CardActions>
            <Button
              size="small"
              onClick={() => {
                setAddCourseDialogState(true);
              }}
            >
              ADD COURSE
            </Button>
          </CardActions>
        </Card>
      </Grid>
      <Grid item>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h5" component="h2">
              View Upcoming Assignments
            </Typography>
            <Typography variant="body2" component="p">
              The goal of DASH is to help all students prioritize coursework
              effectively
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              onClick={() => {
                history.push("/todo");
              }}
            >
              VIEW TODO
            </Button>
          </CardActions>
        </Card>
      </Grid>
      <Grid item>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h5" component="h2">
              View Grade Report &amp; GPA
            </Typography>
            <Typography variant="body2" component="p">
              One of the core benefits of DASH is that it provides real-time
              grades and your GPA in one central location
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              onClick={() => {
                history.push("/gpa");
              }}
            >
              VIEW GRADES
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
    {showAddCourseDialog && <AddCourse />}
  </div>
);

const mapStateToProps = state => {
  return {
    coursesList: state.data.coursesList,
    selectedCourseID: state.ui.selectedCourseID,
    showAddCourseDialog: state.ui.showAddCourseDialog
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUserData: () => dispatch(actions.fetchUserData()),
    courseSelectedHandler: ID => dispatch(actions.setSelectedCourse(ID)),
    setAddCourseDialogState: boolean =>
      dispatch(actions.setAddCourseDialogState(boolean))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(Home));
