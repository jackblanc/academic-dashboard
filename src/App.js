import React, { Component } from 'react';

import { Switch, Route, withRouter } from 'react-router-dom'

import Dashboard from './Containers/Dashboard'
import Authenticate from './Containers/Auth'
import Header from './Components/Layout/Header'
import SideDrawer from './Components/Layout/SideDrawer'
import HomeContent from './Containers/HomeContent'

import * as actions from './store/actions/index'
import { connect } from 'react-redux'

class App extends Component {
  render() {
    let routes =
      <Switch>
        <Route component={Authenticate} path='/auth/' />
        <Route component={HomeContent} path='/' />
      </Switch>

    if (this.props.isAuthenticated) {
      routes =
        <Switch>
          <Route component={Dashboard} path='/courses/' />
          <Route component={Authenticate} path='/auth/' />
          <Route component={HomeContent} path='/' />
        </Switch>
    }

    return (
      <div>
        <Header />
        <SideDrawer
          isOpen={this.props.isDrawerOpen}
          closeDrawer={() => this.props.closeDrawer()}
        />
        {routes}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isDrawerOpen: state.ui.isDrawerOpen,
    isAuthenticated: state.auth.isAuthenticated
  }
}

const mapDispatchToProps = dispatch => {
  return {
    closeDrawer: () => dispatch(actions.setDrawerState(false))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
