"use client";
import { loginByAdmin } from "../../../dataProvider/agent";
import {
  Box,
  Button,
  Card,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import snackbarUtil from "../../../utility/snackbarUtil";
import { SnackbarProvider } from "notistack";

export default function page() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openFailed, setOpenFailed] = useState(false);

  const handleClose = () => {
    setOpenSuccess(false);
    setOpenFailed(false);
  };

  const handleReset = () => {
    setUserName("");
    setPassword("");
  };

  const handleSubmit = async () => {
    const loginForm = {
      email: userName,
      password: password,
    };

    try {
      const res = await loginByAdmin(loginForm);
      console.log(res);

      if (res.status < 400) {
        snackbarUtil.success("Login successful");
        setOpenSuccess(true);
        localStorage.setItem("access_token", res?.data?.token);
        
      } else {
        setOpenFailed(true);
        console.log("Invalid UserName or Password");
        snackbarUtil.error("Invalid UserName or Password");
      }
    } catch (error) {
      snackbarUtil.error("Something went wrong");
      console.error("An error occurred during login:", error);
    }
  };

  const onUserNameChange = (event) => {
    setUserName(event?.target?.value);
  };

  const onPwdChange = (event) => {
    setPassword(event?.target?.value);
  };

  return (
    <div>
      <SnackbarProvider>
        <Container>
          <Card>
            <Box
              component="form"
              sx={{
                width: "100%",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                flexWrap: "wrap",
              }}
            >
              {/* <Card sx={{ width: '50%', p: 5 }}> */}
              <Stack>
                <Typography
                  variant="h6"
                  sx={{
                    display: "flex",
                    fontWeight: "bold",
                    justifyContent: "center",
                    mt: 3,
                  }}
                >
                  WELCOME TO THE MOTEL WEB
                </Typography>
                <TextField
                  sx={{ mt: 3 }}
                  label="Email"
                  fullWidth
                  value={userName}
                  onChange={(e) => onUserNameChange(e)}
                />
                <TextField
                  sx={{ mt: 3 }}
                  label="Password"
                  value={password}
                  type="password"
                  fullWidth
                  onChange={(e) => onPwdChange(e)}
                />
                <Stack
                  direction="row"
                  spacing={3}
                  sx={{ my: 4, display: "flex", justifyContent: "center" }}
                >
                  <Button variant="contained" onClick={handleReset}>
                    Reset
                  </Button>
                  <Button variant="contained" onClick={handleSubmit}>
                    Submit
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Card>
        </Container>
      </SnackbarProvider>
    </div>
  );
}