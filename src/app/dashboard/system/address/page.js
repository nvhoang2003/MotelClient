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
  getDistrict,
  addDistrict,
  editDistrict,
  deleteDistrict,
} from "../../../../dataProvider/agent";

export default function page() {
  const [currentCity, setCurrentCity] = useState("");

  const [cityName, setcityName] = useState("");

  const [listCity, setlistCity] = useState([]);

  const [listDistrict, setlistDistrict] = useState([]);

  const [currentDistrict, setCurrentDistrict] = useState("");

  const [districtName, setDistrictName] = useState("");

  async function fetchCity() {
    const res = await getCity();
    console.log(res);
    try {
      // console.log('fetchLesson', res.data.data);
      setlistCity(res.data);
    } catch (error) {}
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

  console.log(listCity);

  useEffect(() => {
    fetchCity();
  }, []);

  useEffect(() => {
    if (currentCity) {
      fetchDistrict();
    }
  }, [currentCity]);

  const onCityChange = (event) => {
    setcityName(event?.target?.value);
  };

  const onDistrictChange = (event) => {
    setDistrictName(event?.target?.value);
  };

  const handleChange = (event) => {
    setCurrentCity(event.target.value);
  };

  const cityChange = (event) => {
    setCurrentDistrict(event?.target?.value);
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

  const handleSubmitDistrict = async () => {
    const addFormDistrict = {
      city_id: currentCity,
      name: districtName,
    };

    const editFormDistrict = {
      name: districtName,
    };

    console.log(addFormDistrict);
    try {
      const res =
        opendistrictedit == true
          ? await editDistrict(currentDistrict, editFormDistrict)
          : await addDistrict(addFormDistrict);
      console.log(res);

      if (res.status < 400) {
        console.log("Save successful");
        fetchDistrict();
        setOpenAddDistrict(false);
        setOpenEditDistrict(false);
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

  const handleDeleteFormDistrict = async () => {
    try {
      const res = await deleteDistrict(currentDistrict);
      console.log(res);

      if (res.status < 400) {
        console.log("Save successful");
        setCurrentDistrict("");
        fetchDistrict();
        setOpenDeleteDistrict(false);
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
  const [opendistrictadd, setOpenAddDistrict] = React.useState(false);
  const [opendistrictedit, setOpenEditDistrict] = React.useState(false);
  const [opendeleteDistrict, setOpenDeleteDistrict] = React.useState(false);

  const handleClickOpenDelete = () => {
    if (currentCity) {
      const currentCityName = listCity.find((c) => c.id === currentCity);
      setcityName(currentCityName?.name);
      setOpenDeleteDistrict(true);
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

  const handleClickOpenAddDistrict = () => {
    if (currentCity) {
      const currentCityName = listCity.find((c) => c.id === currentCity);
      setcityName(currentCityName?.name);
      setOpenAddDistrict(true);
    } else {
    }
  };

  const handleCloseAddDistrict = () => {
    setOpenAddDistrict(false);
  };

  const handleClickOpenEditDistrict = () => {
    if (currentCity) {
      const currentCityName = listCity.find((c) => c.id === currentCity);
      const currentDistrictName = listDistrict.find(
        (d) => d.id === currentDistrict
      );
      setcityName(currentCityName?.name);
      setDistrictName(currentDistrictName?.name);
      setOpenEditDistrict(true);
    } else {
    }
  };

  const handleCloseEditDistrict = () => {
    setOpenEditDistrict(false);
  };

  const handleClickOpenDeleteDistrict = () => {
    if (currentCity) {
      const currentCityName = listCity.find((c) => c.id === currentCity);
      const currentDistrictName = listDistrict.find(
        (d) => d.id === currentDistrict
      );
      setcityName(currentCityName?.name);
      setDistrictName(currentDistrictName?.name);
      setOpenDeleteDistrict(true);
    } else {
    }
  };

  const handleCloseDeleteDistrict = () => {
    setOpenDeleteDistrict(false);
  };

  return (
    <Box sx={{ width: "100%" }}>
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
      <Box sx={{ display: "flex", width: "100%" }}>
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
        <Button
          variant="contained"
          color="success"
          onClick={handleClickOpenAdd}
          sx={{ mx: 1 }}
        >
          Add
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleClickOpenEdit}
          sx={{ mx: 1 }}
        >
          Edit
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={handleClickOpenDelete}
          sx={{ mx: 1 }}
        >
          Delete
        </Button>
      </Box>
      {/* Add district */}
      <React.Fragment>
        <Dialog open={opendistrictadd} onClose={handleCloseAddDistrict}>
          <DialogTitle>Add new District</DialogTitle>
          <DialogContent>
            <TextField
              disabled
              sx={{ mt: 3 }}
              label="City"
              value={cityName}
              type="text"
              fullWidth
              onChange={onDistrictChange}
            />
            <TextField
              sx={{ mt: 3 }}
              label="District"
              value={districtName}
              type="text"
              fullWidth
              onChange={onDistrictChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAddDistrict}>Cancel</Button>
            <Button type="submit" onClick={handleSubmitDistrict}>
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
      {/* Edit District */}
      <React.Fragment>
        <Dialog open={opendistrictedit} onClose={handleCloseEditDistrict}>
          <DialogTitle>Edit District</DialogTitle>
          <DialogContent>
            <TextField
              disabled
              sx={{ mt: 3 }}
              label="City"
              value={cityName}
              type="text"
              fullWidth
              onChange={onDistrictChange}
            />
            <TextField
              sx={{ mt: 3 }}
              label="District"
              value={districtName}
              type="text"
              fullWidth
              onChange={onDistrictChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEditDistrict}>Cancel</Button>
            <Button type="submit" onClick={handleSubmitDistrict}>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
      {/* delete district */}
      <React.Fragment>
        <Dialog open={opendeleteDistrict} onClose={handleCloseDeleteDistrict}>
          <DialogTitle>Delete District</DialogTitle>
          <DialogContent>
            <TextField
              disabled
              sx={{ mt: 3 }}
              label="City"
              value={cityName}
              type="text"
              fullWidth
              onChange={onDistrictChange}
            />
            <TextField
              disabled
              sx={{ mt: 3 }}
              label="District"
              value={districtName}
              type="text"
              fullWidth
              onChange={onDistrictChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClickOpenDeleteDistrict}>Cancel</Button>
            <Button type="submit" onClick={handleDeleteFormDistrict}>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
      <Box sx={{ display: "flex", width: "100%", mt: 3 }}>
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
        <Button
          variant="contained"
          color="success"
          onClick={handleClickOpenAddDistrict}
          sx={{ mx: 1 }}
        >
          Add
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleClickOpenEditDistrict}
          sx={{ mx: 1 }}
        >
          Edit
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={handleClickOpenDeleteDistrict}
          sx={{ mx: 1 }}
        >
          Delete
        </Button>
      </Box>
    </Box>
  );
}
