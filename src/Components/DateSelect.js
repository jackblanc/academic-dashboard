import React from "react";
import { Box } from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
  KeyboardTimePicker
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const DateSelect = ({
  dueDate,
  handleChangeDueDate,
  dueTime,
  handleChangeDueTime
}) => {
  return (
    <Box>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Due Date"
          value={dueDate}
          onChange={handleChangeDueDate}
          KeyboardButtonProps={{
            "aria-label": "change date"
          }}
        />
        <KeyboardTimePicker
          margin="normal"
          id="time-picker"
          label="Due Time"
          value={dueTime}
          onChange={handleChangeDueTime}
          KeyboardButtonProps={{
            "aria-label": "change time"
          }}
        />
      </MuiPickersUtilsProvider>
    </Box>
  );
};

export default DateSelect;
