import React from 'react';

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/actions'

import { AppBar, Toolbar, Typography, Button, IconButton } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { makeStyles } from '@material-ui/styles';

import firebase from '../../firebase'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}))

const header = function SignIn(props) {

  const classes = useStyles()

  let accountAccess =
    <Button
      className={classes.button}
      color='inherit'
      onClick={() => props.history.push('/auth')}
    >Sign In</Button>
  if (firebase.auth().currentUser !== null) {
    accountAccess =
      <Button
        className={classes.button}
        color='inherit'
        onClick={() => props.logout()}
      >Logout</Button>
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
            onClick={() => {
              const cur = props.isDrawerOpen
              props.toggleSideDrawer(cur)
            }}>
            <MenuIcon />
          </IconButton>
          <Typography
            onClick={() => props.history.push('/')}
            variant='h6'
            className={classes.title}>
            Academic Dashboard
          </Typography>
          {accountAccess}
        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isAuth: state.data.token !== null,
    token: state.token,
    isDrawerOpen: state.isDrawerOpen,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(actions.logout()),
    toggleSideDrawer: (current) => dispatch(actions.setDrawer(!current))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(header));