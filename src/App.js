import React, { Component } from "react";

import { Switch, Route, withRouter, Redirect } from "react-router-dom";

import Dashboard from "./Containers/Dashboard";
import Authenticate from "./Containers/Auth";
import Header from "./Components/Layout/Header";
import SideDrawer from "./Components/Layout/SideDrawer";
import HomeContent from "./Containers/HomeContent";

import * as actions from "./store/actions/index";
import { connect } from "react-redux";
import Course from "./Containers/Course";
import Gpa from "./Containers/Gpa";

class App extends Component {
  constructor(props) {
    super(props);
    this.props.tryAutoAuth();
  }

  render() {
    let routes = (
      <Switch>
        <Route component={Authenticate} path="/auth/" />
        <Route exact component={HomeContent} path="/" />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route component={Course} path="/courses/:id" />
          <Route component={Dashboard} path="/dashboard/" />
          <Route component={Authenticate} path="/auth/" />
          <Route component={Gpa} path="/gpa/" />
          <Route exact component={HomeContent} path="/" />
          <Redirect to="/" />
        </Switch>
      );
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
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUserData: () => dispatch(actions.fetchUserData()),
    closeDrawer: () => dispatch(actions.setDrawerState(false)),
    tryAutoAuth: () => dispatch(actions.tryAutoAuth())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(App));
