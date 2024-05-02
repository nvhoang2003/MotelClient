"use client"
import {useEffect, useState} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import {getCity, getDistrict, getProfile, addCity, postApi} from "../../../../dataProvider/agent";
import {redirect, useRouter} from "next/navigation";


export default function CreateMotelRoom() {
    const [listCity, setListCity] = useState([]);
    const [city, setCity] = useState({});
    const [listDistrict, setListDistrict] = useState([]);
    const [district, setDistrict] = useState({});
    const [motelRoom, setMotelRoom] = useState({
        acreage: '', amount: '', description: '', status: '', district: {id: null}
    });
    const router = useRouter();

    const fetchData = async () => {
        const res = await getCity();
        let listCity = res.data;
        let city = listCity[0];
        setListCity(listCity);
        setCity(city);

        const districtRes = await getDistrict(city.id);
        let listDistrict = districtRes.data;
        setListDistrict(listDistrict);

        console.log(listCity, city, listDistrict);
    }
    const fetchDistrict = async () => {
        const res = await getDistrict(city.id);
        let listDistrict = res.data;
        setListDistrict(listDistrict);
    }

    useEffect(() => {
        console.log("useEffect Call")
        fetchData();
    }, []);

    // Render
    function renderListCity() {
        return listCity.map((city, index) => {
            return <option key={index} value={city.id}>{city.name}</option>
        });
    }

    function renderListDistrict() {
        return (<>
            <option value={-1}>Chọn quận huyện</option>
            {listDistrict.map((district, index) => {
                return <option key={index} value={district.id}>{district.name}</option>
            })}
        </>)

    }

    // Even handler
    const handleChange = (e) => {
        const {name, value} = e.target;
        setMotelRoom(prevState => ({
            ...prevState, [name]: value
        }));
    };
    const handleChangeSelect = async (e) => {
        const {value} = e.target;
        setCity({id: value});
        const res = await getDistrict(value);
        setListDistrict(res.data);
    }
    const handleChangeDistrictSelect = async (e) => {
        const {value} = e.target;
        // Set lại giá trị cho district
        setMotelRoom({
            ...motelRoom, district: {
                id: value
            }
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        let userProfileRes = await getProfile();
        let user = userProfileRes.data;
        let submitData = {
            ...motelRoom, createdBy: user
        }
        // Submit Data
        const res = await postApi('api/motels', submitData);
        console.log(res);
        if (res.status < 400) {
            console.log("Save successful");

        } else {
            console.log("Save failed");
        }
        router.push('/owner/motel')
    };

    return (<div className='p-3'>
        <div className='container'>
            <div className="card">
                <div className="card-header">
                    <div className='d-flex justify-content-between align-items-center'>
                        <h1 className='fs-3 mb-0'>Tạo phòng trọ mới</h1>
                        <button className='btn btn-primary' onClick={() => {
                            console.log("Click back")
                            router.push('/owner/motel')
                        }}>Quay lại
                        </button>
                    </div>
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
                                required
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
                                required
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
                                required
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
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Thuộc thành phố</label>
                            <select onChange={handleChangeSelect}
                                    className='form-select' required>
                                {renderListCity()}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Thuộc thuộc quận huyện (thị xã)</label>
                            <select name='district' onChange={handleChangeDistrictSelect}
                                    className='form-select' required>
                                {renderListDistrict()}
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary">Tạo phòng</button>
                    </form>
                </div>
            </div>
        </div>
    </div>);
}