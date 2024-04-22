"use client"
import 'bootstrap/dist/css/bootstrap.css';
import {useState} from 'react';

export default function PaymentList() {
    const renderListPayment = () => {
        return (<tr>
            <td>Payment For Nguyen Van A</td>
            <td>ATM</td>
            <td>100</td>
            <td>50</td>
            <td>50</td>
            <td>PAID</td>
            <td>Nguyen Van A</td>
            <td>500</td>
            <td>
                <button className='btn btn-warning'>Sửa</button>
            </td>
            <td>
                <button className='btn btn-danger'>Xóa</button>
            </td>
        </tr>)
    }
    return (<div className='container my-5'>
        <div className="card">
            <div className="card-header">
                <h3>List Payment</h3>
            </div>
            <div className="card-body">
                <table className='table table-bordered'>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Payment Method</th>
                        <th>Electric Money</th>
                        <th>Water Money</th>
                        <th>Wifi Money</th>
                        <th>State</th>
                        <th>Tenant Name</th>
                        <th>Total Money</th>
                        <th></th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {renderListPayment()}
                    {renderListPayment()}
                    {renderListPayment()}
                    {renderListPayment()}
                    {renderListPayment()}
                    {renderListPayment()}
                    </tbody>
                </table>
            </div>
        </div>
    </div>)
}