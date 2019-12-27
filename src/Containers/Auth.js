import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { withStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import * as actions from "../store/actions/index";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import queryString from "query-string";

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
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1)
    },
    submit: {
      margin: theme.spacing(3, 0, 2)
    },
    error: {
      color: theme.palette.error.main,
      margin: theme.spacing(1)
    }
  };
};

class Auth extends Component {
  state = {
    email: "",
    password: "",
    isSignIn: false
  };

  componentDidMount() {
    const params = queryString.parse(this.props.location.search);
    if (params.isSignIn) {
      this.setState({
        isSignIn: params.isSignIn
      });
    }
  }

  handleToggleSignInSignUp = () =>
    this.setState(prevState => {
      return {
        isSignIn: !prevState.isSignIn
      };
    });

  submitHandler = () =>
    this.props.onAuth(
      this.state.email,
      this.state.password,
      this.state.isSignIn
    );

  render() {
    const { classes, error, isAuthenticated, onAuth } = this.props;
    const { isSignIn, email, password } = this.state;

    return (
      <Container component="main" maxWidth="xs">
        {isAuthenticated && <Redirect to="/home" />}
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {isSignIn ? "Sign In" : "Sign Up"}
          </Typography>
          <form className={classes.form}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={event =>
                this.setState({
                  email: event.target.value
                })
              }
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={event =>
                this.setState({
                  password: event.target.value
                })
              }
            />
            {error && (
              <Typography className={classes.error}>
                {error.replace("_", " ")}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={event => {
                event.preventDefault();
                onAuth(email, password, isSignIn);
              }}
            >
              {isSignIn ? "Sign In" : "Sign Up"}
            </Button>
            <Grid container>
              <Grid item xs />
              <Grid item>
                <Link onClick={this.handleToggleSignInSignUp} variant="body2">
                  {isSignIn
                    ? "Don't have an account? Sign Up"
                    : "Already have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    error: state.auth.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignIn) =>
      dispatch(actions.authenticate(email, password, isSignIn))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(Auth));
