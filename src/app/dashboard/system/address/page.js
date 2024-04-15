"use client";
import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  getCity,
  addCity,
  editCity,
  deleteCity,
} from "../../../../dataProvider/agent";

export default function page() {
  const [currentCity, setCurrentCity] = useState("");

  const [cityName, setcityName] = useState("");

  const [listCity, setlistCity] = useState([]);

  async function fetchCity() {
    const res = await getCity();
    console.log(res);
    try {
      // console.log('fetchLesson', res.data.data);
      setlistCity(res.data);
    } catch (error) {}
    console.log("asdasd", listCity);
  }

  console.log(listCity);

  useEffect(() => {
    fetchCity();
  }, []);

  const onCityChange = (event) => {
    setcityName(event?.target?.value);
  };

  const handleChange = (event) => {
    setCurrentCity(event.target.value);
  };

  const handleSubmit = async () => {
    const addForm = {
      name: cityName,
    };

    try {
      const res =
        openedit == true
          ? await editCity(addForm, currentCity)
          : await addCity(addForm);
      console.log(res);

      if (res.status < 400) {
        console.log("Save successful");
        fetchCity();
        setOpenAdd(false);
        setOpenEdit(false);
      } else {
        console.log("Save failed");
      }
    } catch (error) {
      console.error("", error);
    }
  };

  const handleDeleteForm = async () => {
    try {
      const res = await deleteCity(currentCity);
      console.log(res);

      if (res.status < 400) {
        console.log("Save successful");
        setCurrentCity("");
        fetchCity();
        setOpenDelete(false);
      } else {
        console.log("Save failed");
      }
    } catch (error) {
      console.error("", error);
    }
  };

  const [openadd, setOpenAdd] = React.useState(false);
  const [openedit, setOpenEdit] = React.useState(false);
  const [opendelete, setOpenDelete] = React.useState(false);

  const handleClickOpenDelete = () => {
    if (currentCity) {
      const currentCityName = listCity.find((c) => c.id === currentCity);
      setcityName(currentCityName?.name);
      setOpenDelete(true);
    } else {
    }
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleClickOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  const handleClickOpenEdit = () => {
    if (currentCity) {
      const currentCityName = listCity.find((c) => c.id === currentCity);
      setcityName(currentCityName?.name);
      setOpenEdit(true);
    } else {
    }
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  return (
    <Box sx={{ minWidth: 120, display: "flex" }}>
      {/* Add */}
      <React.Fragment>
        <Dialog open={openadd} onClose={handleCloseAdd}>
          <DialogTitle>Add new City</DialogTitle>
          <DialogContent>
            <TextField
              sx={{ mt: 3 }}
              label="City"
              value={cityName}
              type="text"
              fullWidth
              onChange={onCityChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAdd}>Cancel</Button>
            <Button type="submit" onClick={handleSubmit}>
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
      {/* Edit */}
      <React.Fragment>
        <Dialog open={openedit} onClose={handleCloseEdit}>
          <DialogTitle>Edit City</DialogTitle>
          <DialogContent>
            <TextField
              sx={{ mt: 3 }}
              label="City"
              value={cityName}
              type="text"
              fullWidth
              onChange={onCityChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEdit}>Cancel</Button>
            <Button type="submit" onClick={handleSubmit}>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
      {/* Delete */}
      <React.Fragment>
        <Dialog open={opendelete} onClose={handleCloseDelete}>
          <DialogTitle>Delete City</DialogTitle>
          <DialogContent>
            <TextField
              disabled
              sx={{ mt: 3 }}
              label="City"
              value={cityName}
              type="text"
              fullWidth
              onChange={onCityChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEdit}>Cancel</Button>
            <Button type="submit" onClick={handleDeleteForm}>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
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
      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          color="success"
          onClick={handleClickOpenAdd}
        >
          Add
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleClickOpenEdit}
        >
          Edit
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={handleClickOpenDelete}
        >
          Delete
        </Button>
      </Stack>
    </Box>
  );
}
