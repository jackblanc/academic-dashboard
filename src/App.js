import React, { Component } from "react";

import { Switch, Route, withRouter, Redirect } from "react-router-dom";

import Home from "./Containers/Home";
import Authenticate from "./Containers/Auth";
import Header from "./Components/Layout/Header";
import SideDrawer from "./Components/Layout/SideDrawer";
import Landing from "./Containers/Landing";
import Todo from "./Containers/Todo";

import * as actions from "./store/actions/index";
import { connect } from "react-redux";
import Course from "./Containers/Course";
import Gpa from "./Containers/Gpa";
import Feedback from "./Containers/Feedback";

class App extends Component {
  render() {
    this.props.tryAutoAuth();
    // TODO: investigate a way to limit routes while still letting direct routes get hit on page load.
    return (
      <div>
        <Header />
        <SideDrawer
          isOpen={this.props.isDrawerOpen}
          closeDrawer={() => this.props.closeDrawer()}
        />
        <Switch>
          <Route component={Course} path="/courses/:id" />
          <Route component={Home} path="/home/" />
          <Route component={Todo} path="/todo/" />
          <Route component={Authenticate} path="/auth/" />
          <Route component={Feedback} path="/feedback/" />
          <Route component={Gpa} path="/gpa/" />
          <Route exact component={Landing} path="/" />
          <Redirect to="/" />
        </Switch>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
