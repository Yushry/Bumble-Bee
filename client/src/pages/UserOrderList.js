import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import UserMenu from '../components/Layout/UserMenu';
import axios from 'axios';
import { Modal, Form, Input, Button } from 'antd';
import moment from 'moment';

const UserOrderList = () => {
    const [orders, setOrders] = useState([]);
    const [isMounted, setIsMounted] = useState(true);
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(
                    `/api/v1/order/orders?customer=${loggedInUser._id}`
                );
                if (isMounted) {
                    setOrders(response.data);
                }
            } catch (error) {
                console.log(error);
            }
        };
        if (loggedInUser && loggedInUser._id) {
            fetchOrders();
        }
        return () => {
            setIsMounted(false);
        };
    }, [loggedInUser, isMounted]);

    useEffect(() => {
        const fetchUserData = async () => {
            if (loggedInUser && loggedInUser._id) {
                try {
                    const response = await axios.get(`/api/v1/users/${loggedInUser._id}`);
                    setSelectedUser(response.data);
                } catch (error) {
                    console.log(error);
                }
            }
        };
        fetchUserData();
    }, [loggedInUser]);

    const handleRemoveOrder = async (id) => {
        try {
            await axios.delete(`/api/v1/order/orders/${id}`);
            setOrders(orders.filter((order) => order._id !== id));
        } catch (error) {
            console.log(error);
        }
    };

    const handleEditOrder = (order) => {
        setSelectedOrder(order);
        setIsModalVisible(true);
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
        setSelectedOrder(null);
        form.resetFields();
    };

    const handleModalOk = async () => {
        try {
            const values = await form.validateFields();
            const updatedOrder = { ...selectedOrder, ...values };
            await axios.put(`/api/v1/order/orders/${updatedOrder._id}`, updatedOrder);
            setOrders(orders.map((order) => (order._id === updatedOrder._id ? updatedOrder : order)));
            setSelectedOrder(null);
            setIsModalVisible(false);
            form.resetFields();
        } catch (error) {
            console.log(error);
        }
    };

    const handleModalFieldsChange = () => {
        setSelectedOrder(form.getFieldsValue());
    };

    return (
        <Layout>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>
                    <div className="col-md-8 card ">
                        <div className="heading">
                            <h1 className='head1'>ORDER LIST</h1>
                        </div>

                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order._id}>
                                        <td>{order.product}
                                        </td>
                                        <td>{order.quantity}</td>
                                        <td>{order.price}</td>
                                        <td>{moment(order.createdAt).format('DD/MM/YYYY')}</td>
                                        <td>
                                            <Button
                                                type="primary"
                                                className="mr-2"
                                                onClick={() => handleEditOrder(order)}
                                            >
                                                Edit
                                            </Button>
                                            <Button type="danger" onClick={() => handleRemoveOrder(order._id)}>
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Modal for Editing Order */}
                        <Modal
                            title="Edit Order"
                            visible={isModalVisible}
                            onCancel={handleModalCancel}
                            onOk={handleModalOk}
                        >
                            <Form
                                form={form}
                                initialValues={{ ...selectedOrder }}
                                onFieldsChange={handleModalFieldsChange}
                            >
                                <Form.Item
                                    name="product"
                                    label="Product"
                                    rules={[{ required: true, message: 'Please input a product name!' }]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name="quantity"
                                    label="Quantity"
                                    rules={[{ required: true, message: 'Please input a quantity!' }]}
                                >
                                    <Input type="number" min={1} />
                                </Form.Item>
                                <Form.Item
                                    name="price"
                                    label="Price"
                                    rules={[{ required: true, message: 'Please input a price!' }]}
                                >
                                    <Input type="number" min={0} step="0.01" />
                                </Form.Item>
                            </Form>
                        </Modal>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default UserOrderList;