import React, { Component } from 'react';

import { Switch, Route, withRouter } from 'react-router-dom'

import Dashboard from './Containers/Dashboard'
import Authenticate from './Containers/Auth'
import Header from './Components/Layout/Header'
import SideDrawer from './Components/Layout/SideDrawer'
import HomeContent from './Containers/HomeContent'

import * as actions from './store/actions/actions'
import { connect } from 'react-redux'
import fire from './firebase'

class App extends Component {
  componentDidMount() {
    // this.props.onTryAutoSignup()
  }

  render() {
    let routes =
      <Switch>
        <Route component={Authenticate} path='/auth/' />
        <Route component={HomeContent} path='/' />
      </Switch>

    if (fire.auth().currentUser !== null) {
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
    isAuth: state.token !== null,
    isDrawerOpen: state.isDrawerOpen
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
    closeDrawer: () => dispatch(actions.setDrawer(false))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
