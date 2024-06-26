"use client"
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { deleteApi, getApi, getProfile } from "../../../dataProvider/agent";
import { Box, Button } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function ListOwnerMotel() {
    let [listMotel, setListMotel] = useState([]);
    const router = useRouter();

    let pageReload = 0;

    // Effect của site
    useEffect(() => {
        if (pageReload === 0) {
            console.log(pageReload++)
            fetchData().then(res => {
                console.log(res)
                setListMotel(res);
            });
        }
    }, []);

    const deleteMotel = async (id) => {
        let res = await deleteApi(`api/motels/${id}`);
        if (res.status === 200) {
            let newListMotel = listMotel.filter(motel => motel.id !== id);
            setListMotel(newListMotel);
        }
    }

    function renderListMotel(listMotel) {
        return listMotel.map((motel, index) => {
            return (<tr key={index}>
                <td>{motel.id}</td>
                <td>{motel.amount}</td>
                <td>{motel.acreage}</td>
                <td>{motel.description}</td>
                <td><a href={`/owner/motel/edit/${motel.id}`} className='btn btn-warning'>Sửa</a></td>
                <td>
                    <button onClick={() => deleteMotel(motel.id)} className='btn btn-danger'>Xóa</button>
                </td>
            </tr>)
        });
    }

    return (<>
        <h1>Danh Sách Phòng Trọ</h1>
        <Box sx={{ display: "flex", justifyContent: 'end' }}>
            <Button variant='contained' onClick={() => router.push(`motel/create`)} >Tạo Mới</Button>
        </Box>
        <table className="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Giá Phòng</th>
                    <th>Diện Tích</th>
                    <th>Mô Tả</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {renderListMotel(listMotel)}
            </tbody>
        </table>
    </>)
}


async function fetchData() {
    let resUser = await getProfile();
    let user = resUser.data;
    let userId = user.id;
    const res = await getApi(`/api/motels/user/${userId}`);
    let listMotel = res.data;
    for (let i = 0; i < listMotel.length; i++) {
        let motel = listMotel[i];
        if (typeof motel.district === "object") continue;
        let id = motel.district;
        let resDistrict = await getApi(`/api/districts/getById/${id}`);
        listMotel[i] = {
            ...motel, district: resDistrict.data
        };
    }
    return listMotel;
}

