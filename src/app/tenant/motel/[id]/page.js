"use client"

import React, { useEffect, useState } from 'react'
import { getMotelById } from '../../../../dataProvider/agent';
import { Box, Card, CardActions, CardContent, CardHeader, Button, Typography } from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

export default function page({ params }) {
    const [value, setValue] = useState();

    const fetchData = async () => {
        try {
            const res = await getMotelById(params.id);
            console.log(res)
            if (res.status < 400) {
                setValue(res.data);
            } else {
                snackbarUtil.error("Can't get the data");
            }
        } catch (error) {
            snackbarUtil.error(error)
        }
    }

    useEffect(() => {
        if (params.id) {
            fetchData()
        }
    }, [params.id])
    console.log(value)
    return (
        <div>
            <Card sx={{ mt: 5 }}>
                <CardHeader title="MOTEL INFORMATION" subheader="See Motel Information And Register For Accommodation" />
                <CardContent sx={{ my: 3, p: 3 }}>
                    <Typography>
                        Owner Full Name : {value?.createdBy?.firstName} {value?.createdBy?.lastName}
                    </Typography>
                    <Box sx={{ display: 'flex' }}>
                        <Typography >
                            Acreage : {value?.acreage} m
                        </Typography>
                        <Typography sx={{ fontSize: '10px' }}>2</Typography>
                    </Box>
                    <Typography>
                        Amount : {value?.amount} VNĐ
                    </Typography>
                    <Typography>
                        Description : {value?.description}
                    </Typography>
                    <Typography>
                        Address: {value?.district?.name} {value?.district?.city?.name}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button>Accommodation</Button>
                </CardActions>
            </Card>
        </div>
    )
}
