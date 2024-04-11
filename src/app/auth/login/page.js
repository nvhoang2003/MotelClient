"use client"
import { loginByAdmin } from '../../../dataProvider/agent';
import { Box, Button, Card, Container, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import SnackBar from '../../../component/snackbar/SnackBar';

export default function page() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openFailed, setOpenFailed] = useState(false);

    const handleClose = () => {
        setOpenSuccess(false);
        setOpenFailed(false);
    }

    const handleReset = () => {
        setUserName('');
        setPassword('');
    }

    const handleSubmit = async () => {
        const loginForm = {
            email: userName,
            password: password,
        };

        try {
            const res = await loginByAdmin(loginForm);
            console.log(res);

            if (res.status < 400) {
                console.log("Login successful");
                setOpenSuccess(true)
                localStorage.setItem("access_token", res?.data?.token);
            } else {
                setOpenFailed(true)
                console.log("Invalid UserName or Password");
                enqueueSnackbar("Invalid UserName or Password");
            }
        } catch (error) {
            console.error("An error occurred during login:", error);
        }
    };

    const onUserNameChange = (event) => {
        setUserName(event?.target?.value);
    }

    const onPwdChange = (event) => {
        setPassword(event?.target?.value);
    }

    return (
        <div>
            <SnackBar
                open={openSuccess}
                handleClose={handleClose}
                variant='success'
                message="Login Successful"
            />
            <SnackBar
                open={openFailed}
                handleClose={handleClose}
                variant='error'
                message="Invalid Username or Password"
            />
            <Container>
                <Card>
                    <Box
                        component="form"
                        sx={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignContent: 'center', flexWrap: 'wrap' }}
                    >
                        {/* <Card sx={{ width: '50%', p: 5 }}> */}
                        <Stack>
                            <Typography variant='h6' sx={{ display: 'flex', fontWeight: 'bold', justifyContent: 'center', mt: 3 }}>WELCOME TO THE MOTEL WEB</Typography>
                            <TextField
                                sx={{ mt: 3 }}
                                label="Email"
                                fullWidth
                                value={userName}
                                onChange={onUserNameChange}
                            />
                            <TextField
                                sx={{ mt: 3 }}
                                label="Password"
                                value={password}
                                type='password'
                                fullWidth
                                onChange={onPwdChange}
                            />
                            <Stack direction='row' spacing={3} sx={{ my: 4, display: 'flex', justifyContent: 'center' }}>
                                <Button variant='contained' onClick={handleReset}>Reset</Button>
                                <Button variant='contained' onClick={handleSubmit}>Submit</Button>
                            </Stack>
                        </Stack>
                    </Box>
                </Card>
            </Container>
        </div>
    )
}
