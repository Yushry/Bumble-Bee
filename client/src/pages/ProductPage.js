import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import AdminMenu from '../components/Layout/AdminMenu';
import { Link } from 'react-router-dom';
import { Modal, Form, Input, InputNumber } from 'antd';

const ProductPage = () => {
    const [products, setProducts] = useState([]);
    const [editProduct, setEditProduct] = useState(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        fetch('/api/v1/product')
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.error(err));
    }, []);

    const handleDelete = async (productId) => {
        try {
            await fetch(`/api/v1/product/${productId}`, {
                method: 'DELETE',
            });
            setProducts(products.filter(product => product._id !== productId));
            alert('Product delete succesfull')
        } catch (err) {
            console.error(err);
        }
    };

    const handleEdit = (product) => {
        setEditProduct(product);
        setVisible(true);
    };

    const handleCancel = () => {
        setEditProduct(null);
        setVisible(false);
    };

    const handleOk = async (values) => {
        try {
            const updatedProduct = { ...editProduct, ...values };
            await fetch(`/api/v1/product/${editProduct._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedProduct),
            });
            setProducts(products.map(product => {
                if (product._id === editProduct._id) {
                    return updatedProduct;
                } else {
                    return product;
                }
            }));
            setEditProduct(null);
            setVisible(false);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Layout>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>

                    <div className="col-md-8 card ">
                        <div className='heading'>
                            <h1 className='head1'>ALL PRODUCT DETAILS</h1>
                        </div>

                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Category</th>
                                    <th>Brand</th>
                                    <th>Price</th>
                                    <th>Inventory</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(product => (
                                    <tr key={product._id}>
                                        <td>{product.name}</td>
                                        <td>{product.category}</td>
                                        <td>{product.brand}</td>
                                        <td>{product.price}</td>
                                        <td>{product.inventory}</td>
                                        <td>
                                            <div className="btn-group">
                                                {/* <button
                                                    type="button"
                                                    className="btn btn-sm btn-primary m-2"
                                                    onClick={() => handleEdit(product)}
                                                >
                                                    Edit
                                                </button> */}
                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-danger m-2"
                                                    onClick={() => handleDelete(product._id)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {/* <Modal
                title={editProduct ? 'Edit Product' : 'Add Product'}
                visible={visible}
                onCancel={handleCancel}
                footer={[
                    <div className='btn3'>
                        <button key="submit" form="productForm btn4" type="submit" className="btn btn-primary">
                            Save
                        </button>,

                        <button key="back" className="btn btn-outline-secondary" onClick={handleCancel}>
                            Cancel
                        </button>,
                    </div>

                ]}
            >
                <Form
                    id="productForm"
                    name="productForm"
                    initialValues={editProduct}
                    onFinish={handleOk}
                    layout="vertical"
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input the product name!' }]}
                        className='form-control1'
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Category"
                        name="category"
                        rules={[{ required: true, message: 'Please select a category!' }]}
                        className='form-control1'
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Brand"
                        name="brand"
                        rules={[{ required: true, message: 'Please input the brand name!' }]}
                        className='form-control1'
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Price"
                        name="price"
                        rules={[{ required: true, message: 'Please input the price!' }]}
                        className='form-control1'
                    >
                        <InputNumber />
                    </Form.Item>

                    <Form.Item
                        label="Inventory"
                        name="inventory"
                        rules={[{ required: true, message: 'Please input the inventory!' }]}
                        className='form-control1'
                    >
                        <InputNumber />
                    </Form.Item>
                </Form>
            </Modal> */}
        </Layout>
    );
};

export default ProductPage;



