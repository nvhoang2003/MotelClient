"use client"
import 'bootstrap/dist/css/bootstrap.css';
import {useEffect, useState} from 'react';
import {deleteApi, getApi, getProfile} from "../../../../dataProvider/agent";

export default function PaymentList() {
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        getProfile().then(res => {
            const user = res.data;
            getApi(`/api/paymentHistories/owner/${user.id}`).then(res => {
                console.log(res.data); // Debugging: You can remove this line once you verify correct data retrieval
                setPayments(res.data); // Assuming the API response directly contains the payment list
            });
        });
    }, []);

    const deletePayment = async (id) => {
        console.log("Delete Click")
        deleteApi(`api/paymentHistories/${id}`).then(res => {
            let paymentDeleted = res.data;
            console.log(paymentDeleted)
            location.reload()
        })
    }

    return (<div className='container my-5'>
        <div className="card">
            <div className="card-header">
                <h3>List Payment</h3>
            </div>
            <div className="card-body">
                <div className={'mb-3'}>
                    <a href={"/owner/payment_history/create_form"} className={"btn btn-success"}>Thêm hóa đơn mới</a>
                </div>
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
                            <th>Sửa</th>
                            <th>Xóa</th>
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
                            <td>
                                <a href={'/owner/payment_history/edit/' + payment.id}
                                   className="btn btn-primary">Sửa</a>
                            </td>
                            <td>
                                <button onClick={() => {
                                    deletePayment(payment.id)
                                }} className="btn btn-danger">Xóa
                                </button>
                            </td>
                        </tr>))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>);
}
