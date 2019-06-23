import React from 'react';

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'

import { AppBar, Toolbar, Typography, Button, IconButton } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { makeStyles } from '@material-ui/styles';

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
  let sideDrawerButton = null
  if (props.isAuthenticated) {
    accountAccess =
      <Button
        className={classes.button}
        color='inherit'
        onClick={() => props.logout()}
      >Logout</Button>
    sideDrawerButton = <IconButton edge="start"
      className={classes.menuButton}
      color="inherit"
      aria-label="Menu"
      onClick={() => {
        const cur = props.isDrawerOpen
        props.toggleSideDrawer(cur)
      }}>
      <MenuIcon />
    </IconButton>
  }

  const redirectPath = props.isAuthenticated ? '/dashboard' : '/'

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {sideDrawerButton}
          <Typography
            onClick={() => props.history.push(redirectPath)}
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
    isAuthenticated: state.auth.isAuthenticated,
    isDrawerOpen: state.ui.isDrawerOpen,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleSideDrawer: (current) => dispatch(actions.setDrawerState(!current)),
    logout: () => dispatch(actions.logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(header));