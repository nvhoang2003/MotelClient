"use client"
import 'bootstrap/dist/css/bootstrap.css';
import {useEffect, useState} from 'react';
import {getApi, getProfile, postApi, putApi} from "../../../../../dataProvider/agent";

export default function PaymentHistoryFormEdit({params}) {
    let payment_id = params.id;
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
        created_by: {id: null},
        motel: {id: null},
    });

    useEffect(() => {
        getApi(`/api/paymentHistories/${payment_id}`).then(res => {
            let payment = res.data;
            console.log(payment)
            setFormData(payment)
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
        putApi(`api/paymentHistories/${payment_id}`, formData).then(res => {
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
                <h3>Edit Payment</h3>
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
                    <div className="d-flex justify-content-end">
                        <a href={'/owner/payment_history/list'} className={'btn btn-info me-3'}>Back</a>
                        <button type="submit" className="btn btn-success">Update</button>
                    </div>
                </form>
            </div>
        </div>
    </div>);
}
