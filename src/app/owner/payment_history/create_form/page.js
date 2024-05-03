"use client"
import 'bootstrap/dist/css/bootstrap.css';
import {useEffect, useState} from 'react';
import {getApi, getProfile, postApi} from "../../../../dataProvider/agent";

export default function PaymentHistoryForm() {
    const [motels, setMotels] = useState([])
    const [tenants, setTenants] = useState([])
    const [tenantsDefault, setTenantsDefault] = useState([])
    const [formData, setFormData] = useState({
        name: '',
        paymentMethod: '',
        state: '',
        electricMoney: '',
        waterMoney: '',
        wifiMoney: '',
        createdBy: {id: null},
        motel: {id: null},
    });

    useEffect(() => {
        getProfile().then(res => {
            let user = res.data
            console.log(user)
            setFormData(prevState => ({
                ...prevState, createdBy: user
            }))
            getApi("api/motels").then(res => {
                let motelData = res.data
                setMotels(motelData.filter(motel => motel.createdBy.id === user.id))
                setFormData(prevState => ({
                    ...prevState, motel: motelData[0]
                }))
            })
            getApi('api/tenants').then(res => {
                let tenantsData = res.data
                setTenantsDefault(tenantsData)
                setTenants(tenantsData)
            })
        })
    }, []);

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData(prevState => ({
            ...prevState, [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Form Data Submitted:', formData);
        postApi("api/paymentHistories", formData).then(res => {
            console.log(res.data)
        })
    };
    const handleMotelChange = (event) => {
        event.preventDefault();
        let motel_id = Number(event.target.value)
        let motelsFilter = motels.filter(motel => motel.id === motel_id)
        setFormData(prevState => ({
            ...prevState, motel: motelsFilter[0]
        }));
    };

    return (<div className="container my-5">
        <div className="card">
            <div className="card-header">
                <h3>Create Payment</h3>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="paymentMethod" className="form-label">Payment Method</label>
                        <input
                            type="text"
                            className="form-control"
                            id="paymentMethod"
                            name="paymentMethod"
                            value={formData.paymentMethod}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="electricMoney" className="form-label">Electric Money</label>
                        <input
                            type="number"
                            className="form-control"
                            id="electricMoney"
                            name="electricMoney"
                            value={formData.electricMoney}
                            onChange={handleChange} ư
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="waterMoney" className="form-label">Water Money</label>
                        <input
                            min="0"
                            type="number"
                            className="form-control"
                            id="waterMoney"
                            name="waterMoney"
                            value={formData.waterMoney}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="wifiMoney" className="form-label">Wifi Money</label>
                        <input
                            min="0"
                            type="number"
                            className="form-control"
                            id="wifiMoney"
                            name="wifiMoney"
                            value={formData.wifiMoney}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="state" className="form-label">State</label>
                        <input
                            type="text"
                            className="form-control"
                            id="state"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="motel" className="form-label">Motel</label>
                        <select id='motel' className='form-select' onChange={handleMotelChange} required>
                            {motels.map((item, index) => {
                                return (<option key={index} value={item.id}>{item.description}</option>)
                            })}
                        </select>
                    </div>
                    <div className="d-flex justify-content-end">
                        <button type="submit" className="btn btn-success">Create</button>
                    </div>
                </form>
            </div>
        </div>
    </div>);
}
