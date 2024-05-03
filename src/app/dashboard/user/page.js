"use client";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
// import { useDemoData } from "@mui/x-data-grid-generator";
import { getUser } from "../../../dataProvider/agent";
import { Dataset } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { Typography } from "@mui/material";

export default function PageSizeCustomOptions() {
  const [user, setlistuser] = useState([]);

  // const { data: listusers } = getUser({
  //   dataSet: "user",
  //   rowLength: 100,
  //   maxColumns: 15,
  // });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const respone = await getUser({});
    setlistuser(respone.data);
  };

  console.log(user);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "firstName",
      headerName: "First name",
      width: 150,
    },
    {
      field: "lastName",
      headerName: "Last name",
      width: 150,
    },
    {
      field: "address",
      headerName: "Address",
      width: 110,
    },
    {
      field: "description",
      headerName: "Description",
      width: 110,
    },
    {
      field: "email",
      headerName: "Email",
      width: 150,
    },
    {
      field: "gender",
      headerName: "Gender",
      type: "number",
      width: 100,
    },
    {
      field: "phone",
      headerName: "Phone",
      type: "number",
      width: 110,
    },
    {
      field: "userName",
      headerName: "Username",
      width: 110,
    },
  ];

  return (
    <div style={{ height: 400, width: "100%", mt: 3 }}>
      <Typography variant="h3" sx={{alignSelf: 'center'}}>List Users</Typography>
      <DataGrid
        rows={user}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
      />
    </div>
  );
}
