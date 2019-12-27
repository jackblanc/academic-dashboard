import React from "react";
import CodeIcon from "@material-ui/icons/Code";
import { Button } from "@material-ui/core";
import EmptyState from "../Components/Layout/EmptyState";
import { makeStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import * as actions from "../store/actions/index";

const useStyles = makeStyles(theme => ({
  emptyStateIcon: {
    fontSize: theme.spacing(12)
  },

  button: {
    marginTop: theme.spacing(1)
  },

  buttonIcon: {
    marginRight: theme.spacing(1)
  }
}));

const HomeContent = ({ history, isAuthenticated, onAuth }) => {
  const classes = useStyles();
  return (
    <EmptyState
      icon={<CodeIcon className={classes.emptyStateIcon} color="action" />}
      title={"DASH"}
      version={""}
      description="Dash is a to-do list built for students. In addition to organizational benefits, 
      it helps students prioritize their work by tracking grades and GPA data. The project utilizes React, Redux,
      React-Router, Firebase, and Material UI."
      button={
        <>
          <Button
            color="primary"
            onClick={() => history.push("/auth?isSignIn=true")}
          >
            {isAuthenticated ? "Continue to DASH" : "Sign In"}
          </Button>
          <br />
          {!isAuthenticated && (
            <Button color="primary" onClick={() => history.push("/auth")}>
              Sign Up
            </Button>
          )}
          <br />
          {!isAuthenticated && (
            <Button
              color="primary"
              onClick={() => {
                history.push("/auth");
                onAuth("jblanc222@gmail.com", "testing", true);
              }}
            >
              View Demo
            </Button>
          )}
        </>
      }
    />
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignIn) =>
      dispatch(actions.authenticate(email, password, isSignIn))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeContent);
