"use client"
import 'bootstrap/dist/css/bootstrap.css';
import {useState} from 'react';

export default function PaymentHistoryForm() {
    const [formData, setFormData] = useState({
        electricMoney: '', name: '', paymentMethod: '', waterMoney: '', wifiMoney: '', state: ''
    });

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData(prevState => ({
            ...prevState, [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Here you would typically handle the submission to your API or backend
        console.log('Form Data Submitted:', formData);
    };

    return (<div className="container my-5">
        <div className="card">
            <div className="card-header">
                <h3>Create Payment</h3>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="electricMoney" className="form-label">Electric Money</label>
                        <input
                            type="number"
                            className="form-control"
                            id="electricMoney"
                            name="electricMoney"
                            value={formData.electricMoney}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
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
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tenant" className="form-label">Payment Ant</label>
                        <select id='tenant' className='form-select'>
                            <option>Nguyen Van Anh</option>
                            <option>Nguyen Van Qua</option>
                            <option>Tenant C</option>
                            <option>Tenant D</option>
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
