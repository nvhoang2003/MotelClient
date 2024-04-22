"use client"
import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import 'bootstrap/dist/css/bootstrap.css';
import {getApi, getCity, getDistrict, postApi, putApi} from '../../../../../dataProvider/agent';
import {router} from "next/client";

export default function EditMotel({params}) {
    const {id} = params;
    const [motel, setMotel] = useState({
        acreage: '', amount: '', description: '', status: '', districtId: '',
    });
    useEffect(() => {
        if (id) {
            fetchMotel(id).then(data => {
                console.log(data)
                setMotel(data);
            });
        }
    }, [id]);
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setMotel(prevMotel => ({
            ...prevMotel, [name]: value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(motel)
        const res = await putApi(`api/motels/${id}`, motel);
        console.log(res)
        // if (res.status < 400) {
        //     console.log("Save successful");
        // } else {
        //     console.log("Save failed");
        // }
    };
    return (<div className='container'>
        <h1>Edit Motel</h1>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Acreage</label>
                <input type="number" className="form-control" name="acreage" value={motel.acreage}
                       onChange={handleInputChange}/>
            </div>
            <div className="form-group">
                <label>Amount</label>
                <input type="number" className="form-control" name="amount" value={motel.amount}
                       onChange={handleInputChange}/>
            </div>
            <div className="form-group">
                <label>Description</label>
                <textarea className="form-control" name="description" value={motel.description}
                          onChange={handleInputChange}/>
            </div>
            <div className="form-group mb-3">
                <label>Status</label>
                <input type="text" className="form-control" name="status" value={motel.status}
                       onChange={handleInputChange}/>
            </div>
            <button type="submit" className="btn btn-primary">Update Motel</button>
        </form>
    </div>);
}

async function fetchMotel(motelId) {
    const res = await getApi(`/api/motels/${motelId}`);
    return res.data;
}
