import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import AdminMenu from '../components/Layout/AdminMenu';
import axios from 'axios';

const CreateNewProduct = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  const [inventory, setInventory] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProduct = {
      name,
      category,
      brand,
      price,
      inventory
    };

    try {
      const res = await axios.post('/api/v1/product', newProduct);
      console.log(res.data);
      alert('Product created successfully!');
      setName('');
      setCategory('');
      setBrand('');
      setPrice('');
      setInventory('');
    } catch (error) {
      console.error(error);
      alert('Failed to create product');
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
              <h1 className='head1'>CREATE NEW PRODUCT</h1>
            </div>

            <form className='form2' onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Product Name</label>
                <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <input type="text" className="form-control" id="category" value={category} onChange={(e) => setCategory(e.target.value)} required />
              </div>
              <div className="form-group">
                <label htmlFor="brand">Brand</label>
                <input type="text" className="form-control" id="brand" value={brand} onChange={(e) => setBrand(e.target.value)} required />
              </div>
              <div className="form-group">
                <label htmlFor="price">Price</label>
                <input type="number" className="form-control" id="price" value={price} onChange={(e) => setPrice(e.target.value)} required />
              </div>
              <div className="form-group">
                <label htmlFor="inventory">Inventory</label>
                <input type="number" className="form-control" id="inventory" value={inventory} onChange={(e) => setInventory(e.target.value)} required />
              </div>
              <button type="submit" className="btn btn-primary btn2">Create Product</button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CreateNewProduct;