import React from 'react';

import { Card, CardContent, CardActions, Typography, Button, makeStyles } from '@material-ui/core';

const useStyle = makeStyles(theme => ({
  Notecard: {
    padding: 40,
    margin: 10
  },
  NotecardActive: {
    padding: 40,
    margin: 10,
    backgroundColor: '#FFFCEF'
  }
}))

export default function CourseNotecard(props) {
  const classes = useStyle()
  return (
    <Card className={props.selected ? classes.NotecardActive : classes.Notecard}>
      <CardContent>
        <Typography variant='h4' >{props.data.ID}</Typography>
        <Typography variant='h5' >{props.data.title}</Typography>
        <Typography variant='h6' >{
          "Current Grade: " + props.data.numericGrade + '%'
        }</Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => props.onButtonClick(props.data.ID)}>
          VIEW COURSE
        </Button>
      </CardActions>
    </Card>
  )
}