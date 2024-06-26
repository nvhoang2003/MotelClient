"use client";
import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Stack, Switch } from "@mui/material";
// import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import { signUpAccount } from "../../../dataProvider/agent";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import snackbarUtil from "../../../utility/snackbarUtil";
import { PATH_AUTH } from "../../../routes/path";

// TODO remove, this demo shouldn't need to reset the theme.

export default function SignUp() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    password2: "",
  });

  const [isOwner, setIsOwner] = useState(true);

  const { firstName, lastName, email, password, password2 } = formData;

  const handeleChange = (e) => {
    setIsOwner(isOwner == true ? false : true);
  }


  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      // console.log("Passwords do not match");
      snackbarUtil.warning("Passwords do not match");
    } else {
      // console.log(formData);
      const newUser = {
        firstName,
        lastName,
        email,
        password,
      };
      try {
        var response = await signUpAccount(newUser, isOwner);
        console.log(response);
        if (response.status < 400) {
          snackbarUtil.success("Sign up successfully");
          window.location.href = PATH_AUTH.login;
        }else{
          snackbarUtil.error(response?.response?.data)
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <SnackbarProvider>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={firstName}
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={lastName}
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password2"
                  label="Confirm Password"
                  type="password"
                  id="password2"
                  value={password2}
                  onChange={onChange}
                />
              </Grid>
            </Grid>
            <Stack direction='row' spacing={2}>
              <Typography>
                Register Owner Acccout
              </Typography>
              <Switch checked={isOwner} onChange={(e) => handeleChange(e)} />
            </Stack>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onChange={onChange}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/auth/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </SnackbarProvider>
    </Container>
  );
}
