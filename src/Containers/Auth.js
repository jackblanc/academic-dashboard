import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { withStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import * as actions from '../store/actions/index'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

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
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    error: {
      color: theme.palette.error.main,
      margin: theme.spacing(1)
    }
  }
}

class Auth extends Component {
  state = {
    email: '',
    password: '',
    isSignIn: true
  }

  onAlternate = () => {
    const bool = this.state.isSignIn
    this.setState({ isSignIn: !bool })
  }

  submitHandler = (event) => {
    event.preventDefault()
    this.props.onAuth(this.state.email, this.state.password, this.state.isSignIn)
  }

  render() {
    const { classes } = this.props

    let errorMessage = '';
    if (this.props.error) {
      errorMessage = (
        <Typography className={classes.error}>{this.props.error.replace('_', ' ')}</Typography>
      )
    }

    let redirect = null;
    if (this.props.isAuthenticated) {
      redirect = <Redirect to='/courses' />
    }

    return (
      <Container component="main" maxWidth="xs">
        {redirect}
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {this.state.isSignIn ? 'Sign In' : 'Sign Up'}
          </Typography>
          <form className={classes.form} noValidate>
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
              value={this.state.email}
              onChange={(event) => {
                this.setState({
                  ...this.state,
                  email: event.target.value
                })
              }}
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
              value={this.state.password}
              onChange={(event) => {
                this.setState({
                  ...this.state,
                  password: event.target.value
                })
              }}
            />
            {errorMessage}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.submitHandler}
            >
              {this.state.isSignIn ? 'Sign In' : 'Sign Up'}
            </Button>
            <Grid container>
              <Grid item xs>
              </Grid>
              <Grid item>
                <Link onClick={this.onAlternate} variant="body2">
                  {this.state.isSignIn ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    )
  }
}


const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    error: state.auth.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignIn) => dispatch(actions.authenticate(email, password, isSignIn))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(Auth))