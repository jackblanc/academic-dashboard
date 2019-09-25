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
    feedbackText: "",
    submitted: false
  };

  render() {
    const { classes } = this.props;
    const { feedbackText } = this.state;

    return (
      <div className={classes.paper}>
        <Typography variant="h2" className={classes.title}>
          Feedback Form
        </Typography>
        {this.state.submitted && (
          <Typography variant="h6">Thank you for your feedback!</Typography>
        )}
        <Container maxWidth="sm">
          <TextField
            id="feedback-input"
            label="Feedback"
            variant="outlined"
            multiline
            fullWidth
            value={feedbackText}
            onChange={event => {
              this.setState({
                feedbackText: event.target.value,
                submitted: false
              });
            }}
          />
        </Container>
        <Button
          variant
          onClick={() => {
            this.props.submitFeedback(this.state.feedbackText);
            this.setState({ feedbackText: "", submitted: true });
          }}
        >
          Submit
        </Button>
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
    submitFeedback: message => dispatch(actions.submitFeedback(message))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Feedback));
