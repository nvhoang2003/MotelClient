"use client";
import * as React from "react";
import { getProfile } from "../../../dataProvider/agent";
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
import { updateProfile } from "../../../dataProvider/agent";

export default function My_Profile() {
  const [Profile, setProfile] = useState("");

  const { userName, firstName, lastName, phone, gender } = Profile;

  async function fetchUser() {
    try {
      const res = await getProfile();
      // console.log(res);
      setProfile(res.data);
    } catch (error) {}
  }
  const handleChange = (event) => {
    setProfile({ ...Profile, gender: event.target.value });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onChange = (e) =>
    setProfile({ ...Profile, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    // const addForm = {
    //   userName: userName,
    //   firstName: firstName,
    //   lastName: lastName,
    //   phone: phone,
    //   gender: gender,
    // };

    try {
      var res = await updateProfile(Profile.id, Profile);
      console.log(res);

      if (res.status < 400) {
        console.log("Save successful");
        fetchUser();
        setOpen(false);
      } else {
        console.log("Save failed");
      }
    } catch (error) {
      console.error("", error);
    }
  };

  console.log(Profile);

  return (
    <Box sx={{ minWidth: 120, display: "flex" }}>
      <React.Fragment>
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
      </React.Fragment>
      <FormControl sx={{ width: "100%" }}>
        <Typography sx={{ mt: 1 }}>Name</Typography>
        <TextField
          value={Profile.userName}
          type="text"
          fullWidth
          name="userName"
          onChange={onChange}
        />
        <Typography sx={{ mt: 1 }}>First Name</Typography>
        <TextField
          value={Profile.firstName}
          type="text"
          fullWidth
          name="firstName"
          onChange={onChange}
        />
        <Typography sx={{ mt: 1 }}>Last Name</Typography>
        <TextField
          value={Profile.lastName}
          type="text"
          fullWidth
          name="lastName"
          onChange={onChange}
        />
        <Typography sx={{ mt: 1 }}>Phone</Typography>
        <TextField value={Profile.phone} type="text" fullWidth name="Phone" />
        <Typography sx={{ mt: 1 }}>Gender</Typography>
        <Select
          value={Profile?.gender == undefined ? 0 : Profile?.gender}
          onChange={handleChange}
        >
          <MenuItem value={"0"}>Male</MenuItem>
          <MenuItem value={"1"}>Female</MenuItem>
        </Select>
        <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
          <Button variant="contained" color="success" onClick={handleClickOpen}>
            Edit
          </Button>
        </Stack>
      </FormControl>
    </Box>
  );
}
