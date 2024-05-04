"use client"
import 'bootstrap/dist/css/bootstrap.css';
import {useEffect, useState} from 'react';
import {deleteApi, getApi, getProfile} from "../../../dataProvider/agent";

export default function PaymentList() {
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        getProfile().then(res => {
            const user = res.data;
            getApi(`/api/tenants/user/${user.id}`).then(res => {
                let tenants = res.data;
                console.log(tenants)
                let paymentList = []
                for (const tenant of tenants) {
                    getApi(`/api/paymentHistories/motel/${tenant.motel.id}`).then(res => {
                        let motels = res.data
                        paymentList = [...paymentList, ...motels]
                        setPayments(paymentList)
                    })
                }
            })
        });
    }, []);

    console.log(payments)
    return (<div className='container my-5'>
        <div className="card">
            <div className="card-header">
                <h3>List Payment</h3>
            </div>
            <div className="card-body">
                <div className={'table-responsive'}>
                    <table className='table table-bordered'>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Motel</th>
                            <th>Payment Method</th>
                            <th>State</th>
                            <th>Motel Money</th>
                            <th>Electric Money</th>
                            <th>Water Money</th>
                            <th>Wifi Money</th>
                            <th>Total Money</th>
                        </tr>
                        </thead>
                        <tbody>
                        {payments.map(payment => (<tr key={payment.id}>
                            <td>{payment.name}</td>
                            <td>{payment.motel.id} - {payment.motel.description}</td>
                            <td>{payment.paymentMethod}</td>
                            <td>{payment.state}</td>
                            <td>{payment.motel.amount}</td>
                            <td>{payment.electricMoney}</td>
                            <td>{payment.waterMoney}</td>
                            <td>{payment.wifiMoney}</td>
                            <td>{payment.motel.amount + payment.electricMoney + payment.waterMoney + payment.wifiMoney}</td>
                        </tr>))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>);
}
