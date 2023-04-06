import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import AdminMenu from '../components/Layout/AdminMenu';
import axios from 'axios';

const AllOrders = () => {
    const [orders, setOrders] = useState([]);

    const getAllOrders = async () => {
        try {
            const response = await axios.get('/api/v1/order/orders');
            setOrders(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteOrder = async (orderId) => {
        try {
            await axios.delete(`/api/v1/order/orders/${orderId}`);
            getAllOrders();
        } catch (error) {
            console.log(error);
            alert('customer order deleted')
        }
    };

    useEffect(() => {
        getAllOrders();
    }, []);

    return (
        <Layout>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>

                    <div className="col-md-8 card ">
                        <div className="heading">
                            <h1 className='head1'>ALL ORDERS</h1>
                        </div>
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>Customer Name</th>
                                    <th>Product</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order._id}>
                                        <td>{order.customer}</td>
                                        <td>{order.product}</td>
                                        <td>{order.quantity}</td>
                                        <td>{order.price}</td>
                                        <td>
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => deleteOrder(order._id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default AllOrders;