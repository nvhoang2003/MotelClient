"use client"
import React, { useCallback } from 'react'
import RootLayout from '../../../layout'
import { useState } from "react";
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import 'react-quill/dist/quill.snow.css';
import { Button, Box } from '@mui/material';
import { createThePost } from '../../../../dataProvider/agent';

page.getLayout = (page) => <RootLayout>{page}</RootLayout>

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function page() {
    const [value, setValue] = useState('')
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

    const handleSave = async() => {
        console.log(value)
        var data = {
            content: value
        }

        try {
            var res = await createThePost(data);
            if (res.status < 400) {
                console.log("Login successful");
                // setOpenSuccess(true)
                // localStorage.setItem("access_token", res?.data?.token);
            } else {
                // setOpenFailed(true)
                console.log("Invalid UserName or Password");
                // enqueueSnackbar("Invalid UserName or Password");
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Box>
                <ReactQuill
                    value={value}
                    onChange={setValue}
                    modules={quillModules}
                    formats={quillFormats}
                />
                <Button variant='contained' onClick={() => handleSave()} sx={{my: 3}}>Save</Button>
            </Box>
        </>
    )
}
