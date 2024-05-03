"use client"
import React, { useEffect, useState } from 'react'
import RootLayout from '../../../../layout'
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import 'react-quill/dist/quill.snow.css';
import { Button, Box, Snackbar } from '@mui/material';
import { getPostByid, updateThePost } from '../../../../../dataProvider/agent';
import snackbarUtil from '../../../../../utility/snackbarUtil';
import { SnackbarProvider } from 'notistack';

page.getLayout = (page) => <RootLayout>{page}</RootLayout>

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function page({ params }) {
    const [value, setValue] = useState('');
    const quillModules = {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'],
            [{ align: [] }],
            [{ color: [] }],
            ['code-block'],
            ['clean'],
        ],
    };
    console.log(params)
    console.log(value);
    const quillFormats = [
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'link',
        'image',
        'align',
        'color',
        'code-block',
    ];

    const fetchPost = async () => {
        try {
            const res = await getPostByid(params.id);
            console.log(res)
            if (res.status < 400) {
                setValue(res.data.content);
            } else {
                snackbarUtil.error("Can't get the data");
            }
        } catch (error) {
            snackbarUtil.error(error)
        }
    }

    const handleSave = async () => {
        console.log(value)
        var data = {
            content: value
        }

        try {
            var res = await updateThePost(params.id, data);
            console.log(res)
            if (res.status < 400) {
                snackbarUtil.success("Update successfuly");
                // setOpenSuccess(true)
                // localStorage.setItem("access_token", res?.data?.token);
            } else {
                // setOpenFailed(true)
                snackbarUtil.error("Update Failed");
                // enqueueSnackbar("Invalid UserName or Password");
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (params.id) {
            fetchPost()
        }
    }, [params.id])

    return (
        <div>
            <>
                <Box>
                    <ReactQuill
                        value={value}
                        onChange={setValue}
                        modules={quillModules}
                        formats={quillFormats}
                    />
                    <Button variant='contained' onClick={() => handleSave()} sx={{ my: 3 }}>Save</Button>
                </Box>
            </>
        </div>
    )
}
