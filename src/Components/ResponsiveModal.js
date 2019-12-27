import React from "react";

import { Dialog, DialogTitle } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const ResponsiveModal = ({ open, onClose, children, title }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("xs"));
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={matches}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      {children}
    </Dialog>
  );
};

export default ResponsiveModal;
