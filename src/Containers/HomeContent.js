import React from "react";
import CodeIcon from "@material-ui/icons/Code";
import { Button } from "@material-ui/core";
import EmptyState from "../Components/Layout/EmptyState";
import { makeStyles } from "@material-ui/styles";
import { connect } from "react-redux";

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

function HomeContent(props) {
  const classes = useStyles();
  return (
    <EmptyState
      icon={<CodeIcon className={classes.emptyStateIcon} color="action" />}
      title={"DASH"}
      description="A revolutionary tool that allows students to stay on top of their coursework"
      button={
        <Button color="primary" onClick={() => props.history.push("/auth")}>
          {props.isAuthenticated ? "Continue to DASH" : "Sign In"}
        </Button>
      }
    />
  );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
};

export default connect(mapStateToProps)(HomeContent);
