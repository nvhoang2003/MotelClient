"use client"
import {useState} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';

export default function CreateMotelRoom() {

    const [motelRoom, setMotelRoom] = useState({
        acreage: '', amount: '', description: '', status: ''
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setMotelRoom(prevState => ({
            ...prevState, [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Here you would typically handle the POST request to your backend API
        console.log('Submitting', motelRoom);
        // Reset form
        setMotelRoom({
            acreage: '', amount: '', description: '', status: ''
        });
    };

    return (<div className='p-3'>
        <div className='container'>
            <div className="card">
                <div className="card-header">
                    Tạo phòng trọ mới
                </div>
                <div className='card-body'>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="acreage" className="form-label">Diện tích</label>
                            <input
                                type="number"
                                className="form-control"
                                id="acreage"
                                name="acreage"
                                value={motelRoom.acreage}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="amount" className="form-label">Giá</label>
                            <input
                                type="number"
                                className="form-control"
                                id="amount"
                                name="amount"
                                value={motelRoom.amount}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Mô tả</label>
                            <textarea
                                className="form-control"
                                id="description"
                                name="description"
                                value={motelRoom.description}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="status" className="form-label">Trạng thái</label>
                            <input
                                type="text"
                                className="form-control"
                                id="status"
                                name="status"
                                value={motelRoom.status}
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Tạo phòng</button>
                    </form>
                </div>
            </div>
        </div>
    </div>);
}