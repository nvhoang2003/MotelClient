"use client"
import React, { useCallback, useState, useEffect } from 'react'
import RootLayout from '../../../layout'
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import 'react-quill/dist/quill.snow.css';
import { Button, Box, TextField, FormControl, InputLabel, Select, MenuItem, Stack } from '@mui/material';
import { createThePost, getCity, getDistrict } from '../../../../dataProvider/agent';

page.getLayout = (page) => <RootLayout>{page}</RootLayout>;

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function page() {
  const [value, setValue] = useState("");
  const [currentCity, setCurrentCity] = useState("");

  const [listCity, setlistCity] = useState([]);

  const [listDistrict, setlistDistrict] = useState([]);

  const [currentDistrict, setCurrentDistrict] = useState("");

  const [title, setTitle] = useState("");
  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [{ align: [] }],
      [{ color: [] }],
      ["code-block"],
      ["clean"],
    ],
  };

  const handleChange = (event) => {
    setCurrentCity(event.target.value);
  };

  const cityChange = (event) => {
    setCurrentDistrict(event?.target?.value);
  };

  async function fetchCity() {
    const res = await getCity();
    console.log(res);
    try {
      // console.log('fetchLesson', res.data.data);
      setlistCity(res.data);
    } catch (error) { }
    console.log("asdasd", listCity);
  }

  async function fetchDistrict() {
    const input = {
      cityId: currentCity,
    };
    const res = await getDistrict(currentCity);
    console.log(res);
    try {
      setlistDistrict(res.data);
    } catch (error) {
      console.log("asd", listDistrict);
    }
  }

  useEffect(() => {
    fetchCity();
  }, []);

  useEffect(() => {
    if (currentCity) {
      fetchDistrict();
    }
  }, [currentCity]);

  const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
    "align",
    "color",
    "code-block",
  ];

  const handleSave = async () => {
    console.log(value);
    var data = {
      title: title,
      content: value,
      district: listDistrict.find((item) => item.id == currentDistrict)
    };
    try {
      var res = await createThePost(data);
      if (res.status < 400) {
        console.log("Login successful");
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box sx={{ mt: 3 }}>
        <TextField
          value={title}
          label='Title'
          onChange={(e) => setTitle(e.target.value)}
          sx={{ width: "100%", mb: 1 }}
        />
        <Stack sx={{ width: '100%', mb:1 }} direction='row' spacing={2}>
          <FormControl sx={{ width: "50%" }}>
            <InputLabel id="city">City</InputLabel>
            <Select
              labelId="city"
              id="city"
              value={currentCity}
              label="city"
              onChange={handleChange}
            >
              {listCity.map((city, index) => {
                return (
                  <MenuItem key={index} value={city.id}>
                    {city.name}
                  </MenuItem>
                );
              })}
              {/* <MenuItem value={"Ha Noi"}>Hà Nội</MenuItem>
          <MenuItem value={"Ho Chi Minh"}>Hồ Chí Minh</MenuItem>
          <MenuItem value={"Da Nang"}>Đà Nẵng</MenuItem> */}
            </Select>
          </FormControl>
          <FormControl sx={{ width: "50%" }}>
            <InputLabel id="districts">District</InputLabel>
            <Select
              id="districts"
              value={currentDistrict}
              label="districts"
              onChange={cityChange}
            >
              {listDistrict?.map((district, index) => {
                return (
                  <MenuItem key={index} value={district.id}>
                    {district.name}
                  </MenuItem>
                );
              })}
              {/* <MenuItem value={"Ha Noi"}>Hà Nội</MenuItem>
          <MenuItem value={"Ho Chi Minh"}>Hồ Chí Minh</MenuItem>
          <MenuItem value={"Da Nang"}>Đà Nẵng</MenuItem> */}
            </Select>
          </FormControl>
        </Stack>
        <ReactQuill
          value={value}
          onChange={setValue}
          modules={quillModules}
          formats={quillFormats}
        />
        <Button variant="contained" onClick={() => handleSave()} sx={{ my: 3 }}>
          Save
        </Button>
      </Box>
    </>
  );
}
