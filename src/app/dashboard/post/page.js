"use client"
import React, { useCallback, useState, useEffect } from 'react'
import RootLayout from '../../layout';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import 'react-quill/dist/quill.snow.css';
import { Button, Box, Stack, Card, Typography } from '@mui/material';
import { getAllPost, deleteThePost } from '../../../dataProvider/agent';
import snackbarUtil from '../../../utility/snackbarUtil';
import { SnackbarProvider } from 'notistack';
import { useRouter } from 'next/navigation';
import 'react-quill/dist/quill.bubble.css'; // Import the bubble theme stylesheet

page.getLayout = (page) => <RootLayout>{page}</RootLayout>

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function page() {
    const [listPost, setListPost] = useState([]);
    const router = useRouter();

    const handleDelete = async (item) => {
        try {
            const res = await deleteThePost(item.id)
            if (res.status < 400) {
                fetchMyPosts()
                snackbarUtil.success("Delete Successfully");
            } else {
                snackbarUtil.error("Delete Failed");
            }
        } catch (error) {
            snackbarUtil.error(error)
        }
    }

    const fetchMyPosts = async () => {
        try {
            const res = await getAllPost();
            console.log(res)
            if (res.status < 400) {
                setListPost(res.data);
            } else {
                snackbarUtil.error("Can't get the data");
            }
        } catch (error) {
            snackbarUtil.error(error)
        }
    }

    useEffect(() => {
        fetchMyPosts()
    }, [])

    return (
        <SnackbarProvider>
            <div>
                {listPost.map((item, index) => {
                    console.log(item)
                    return (
                        <Box key={index} sx={{ mt: 3 }}>
                            <Card sx={{ p: 1 }}>
                                <Typography>
                                    Author: {item?.createdBy?.email}
                                </Typography>
                                <ReactQuill
                                    theme='bubble'
                                    value={item?.content}
                                    readOnly
                                />
                                <Stack direction='row' spacing={3} sx={{ mt: 1, width: '100%', justifyContent: 'flex-end' }}>
                                    <Button variant='contained' onClick={() => handleDelete(item)} sx={{ backgroundColor: 'red' }}>Delete</Button>
                                </Stack>
                            </Card>
                        </Box>
                    )
                })}
            </div>
        </SnackbarProvider>
    )
}
