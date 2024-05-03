"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import 'bootstrap/dist/css/bootstrap.css';
import { getApi, getProfile, postApi, putApi} from '../../../../../dataProvider/agent';
import { router } from "next/client";
export default function EditMotel({ params }) {
    const router = useRouter();
    const { id } = params;
    const [motel, setMotel] = useState({
        acreage: '', amount: '', description: '', emailTenant: '', districtId: '',
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
        const { name, value } = e.target;
        setMotel(prevMotel => ({
            ...prevMotel, [name]: value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        let userProfileRes = await getProfile();
        let user = userProfileRes.data;
        let submitData = {
            ...motel, createdBy: user
        }

        const res = await putApi(`api/motels/${id}`, submitData);
        console.log(res)
        if (res.status < 400) {
            console.log("Save successful");
        } else {
            console.log("Save failed");
        }
        await router.push('/owner/motel')
    };
    return (<div className='container'>
        <h1>Edit Motel</h1>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Acreage</label>
                <input type="number" className="form-control" name="acreage" value={motel.acreage}
                    onChange={handleInputChange} />
            </div>
            <div className="form-group">
                <label>Amount</label>
                <input type="number" className="form-control" name="amount" value={motel.amount}
                    onChange={handleInputChange} />
            </div>
            <div className="form-group">
                <label>Description</label>
                <textarea className="form-control" name="description" value={motel.description}
                    onChange={handleInputChange} />
            </div>
            <div className="form-group mb-3">
                <label>Email Người Thuê</label>
                <input type="text" className="form-control" name="emailTenant" value={motel.emailTenant}
                    onChange={handleInputChange} />
            </div>
            <button type="submit" className="btn btn-primary">Update Motel</button>
        </form>
    </div>);
}

async function fetchMotel(motelId) {
    const res = await getApi(`/api/motels/${motelId}`);
    return res.data;
}
