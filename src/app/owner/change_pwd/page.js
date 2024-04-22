"use client";
import React from "react";
import { FormControl, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function page() {
  return (
    <Box sx={{ minWidth: 120, display: "flex" }}>
      {/* <React.Fragment>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{"Update your profile?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure want to update your profile
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit} autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment> */}
      <FormControl sx={{ width: "100%" }}>
        <Typography sx={{ mt: 1 }}>Enter old password</Typography>
        <TextField
          // value={Profile.userName}
          type="password"
          fullWidth
          name="userName"
          // onChange={onChange}
        />
        <Typography sx={{ mt: 1 }}>Enter new password</Typography>
        <TextField
          // value={Profile.firstName}
          type="password"
          fullWidth
          name="firstName"
          // onChange={onChange}
        />
        <Typography sx={{ mt: 1 }}>Confirm new password</Typography>
        <TextField
          // value={Profile.lastName}
          type="password"
          fullWidth
          name="lastName"
          // onChange={onChange}
        />
        <Box sx={{ mt: 1, display: "flex", justifyContent: "end" }}>
          <Button variant="contained" color="success">
            Save
          </Button>
        </Box>
      </FormControl>
    </Box>
  );
}
