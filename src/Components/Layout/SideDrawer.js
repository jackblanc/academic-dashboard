import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import { ListItem, ListItemIcon, ListItemText, Divider, List } from '@material-ui/core'
import AllCourses from '@material-ui/icons/BorderAll';
import HomeIcon from '@material-ui/icons/Home'
import LibraryBooks from '@material-ui/icons/LibraryBooks'

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

function SideDrawer(props) {
  const classes = useStyles();

  const drawerList = []
  for (const key in props.coursesList) {
    drawerList.push(
      <ListItem button onClick={() => {
        props.history.push('/courses/' + key)
        props.setSelectedCourse(key)
        props.closeDrawer()
      }} key={key}>
        <ListItemIcon><LibraryBooks /></ListItemIcon>
        <ListItemText>{key}</ListItemText>
      </ListItem>
    )
  }

  const sideList = (
    <div
      className={classes.list}
      role="presentation"
    >
      <List>
        <ListItem button onClick={() => {
          props.history.push('/')
          props.closeDrawer()
          }}>
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText>Home</ListItemText>
        </ListItem>
        <ListItem button onClick={() => {
          props.history.push('/dashboard')
          props.closeDrawer()}}>
          <ListItemIcon><AllCourses /></ListItemIcon>
          <ListItemText>Dashboard</ListItemText>
        </ListItem>
      </List>
      <Divider />
      <List>
        {drawerList}
      </List>
    </div>
  );

  return (
    <Drawer open={props.isOpen} onClose={() => props.closeDrawer()}>
      {sideList}
    </Drawer>
  );
}

const mapStateToProps = state => {
  return {
    coursesList: state.data.coursesList
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setSelectedCourse: (courseID) => dispatch(actions.setSelectedCourse(courseID))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SideDrawer))