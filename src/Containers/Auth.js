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

import * as actions from '../store/actions/actions'
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
    isSignUp: false
  }

  onAlternate = () => {
    const bool = this.state.isSignUp
    this.setState({ isSignUp: !bool })
  }

  submitHandler = (event) => {
    event.preventDefault()
    this.props.onAuth(this.state.email, this.state.password, this.state.isSignUp)
  }

  render() {
    const { classes } = this.props

    let errorMessage = '';
    if (this.props.error) {
      errorMessage = (
        <Typography className={classes.error}>{this.props.error.message.replace('_', ' ')}</Typography>
      )
    }

    let redirect = null;
    console.log(this.props.token)
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
            {this.state.isSignUp ? 'Sign Up' : 'Sign In'}
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
              {this.state.isSignUp ? 'Sign Up' : 'Sign In'}
            </Button>
            <Grid container>
              <Grid item xs>
              </Grid>
              <Grid item>
                <Link onClick={this.onAlternate} variant="body2">
                  {this.state.isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
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
    loading: state.main.loading,
    error: state.main.error,
    isAuthenticated: state.main.isAuthenticated
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(Auth))