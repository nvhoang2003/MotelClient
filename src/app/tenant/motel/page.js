"use client"
import {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {getApi, getProfile} from "../../../dataProvider/agent";

export default function ListOwnerMotel() {
    let [listMotel, setListMotel] = useState([]);
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
                <td><a href={`/tenant/motel/${motel.id}`} className='btn btn-info'>Xem Hóa Đơn</a></td>
            </tr>)
        });
    }

    return (<>
        <h1>List Motel</h1>
        <table className="table">
            <thead>
            <tr>
                <th>ID</th>
                <th>Amount</th>
                <th>Acreage</th>
                <th>Description</th>
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
    const res = await getApi(`/api/motelsOfTenant`);
    let listMotel = res.data;
    // for (let i = 0; i < listMotel.length; i++) {
    //     let motel = listMotel[i];
    //     if (typeof motel.district === "object") continue;
    //     let id = motel.district;
    //     let resDistrict = await getApi(`/api/districts/getById/${id}`);
    //     listMotel[i] = {
    //         ...motel, district: resDistrict.data
    //     };
    // }
    return listMotel;
}

