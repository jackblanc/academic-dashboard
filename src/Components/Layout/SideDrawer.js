import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import { ListItem, ListItemIcon, ListItemText, Divider, List } from '@material-ui/core'
import AllCourses from '@material-ui/icons/BorderAll';
import HomeIcon from '@material-ui/icons/Home'

import { withRouter } from 'react-router-dom'

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

  const sideList = (
    <div
      className={classes.list}
      role="presentation"
    >
      <List>
        <ListItem button onClick={() => props.history.push('/')}>
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText>Home</ListItemText>
        </ListItem>
        <ListItem button onClick={() => props.history.push('/courses')}>
          <ListItemIcon><AllCourses /></ListItemIcon>
          <ListItemText>All Courses</ListItemText>
        </ListItem>
      </List>
      <Divider />
      <List>

      </List>
    </div>
  );

  return (
    <Drawer open={props.isOpen} onClose={() => props.closeDrawer()}>
      {sideList}
    </Drawer>
  );
}

export default withRouter(SideDrawer)