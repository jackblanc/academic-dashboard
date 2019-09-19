import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { Typography, Button, TextField, Container } from "@material-ui/core";
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

class Feedback extends Component {
  state = {
    feedbackText: ""
  };

  render() {
    const { classes } = this.props;
    const { feedbackText } = this.state;

    return (
      <div className={classes.paper}>
        <Typography variant="h2" className={classes.title}>
          Feedback Form
        </Typography>
        <Container maxWidth="sm">
          <TextField
            id="feedback-input"
            label="Feedback"
            variant="outlined"
            multiline
            fullWidth
            value={feedbackText}
            onChange={event => {
              this.setState({ feedbackText: event.target.value });
            }}
          />
        </Container>
        <Button variant>Submit</Button>
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
)(withStyles(styles)(Feedback));
