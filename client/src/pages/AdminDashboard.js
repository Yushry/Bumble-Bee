import { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import AdminMenu from '../components/Layout/AdminMenu';
import axios from 'axios';
import { Modal } from 'antd';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    axios.get('/api/v1/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const getStatus = (dateOfBirth) => {
    const dob = new Date(dateOfBirth);
    const age = Math.floor((new Date() - dob) / 31557600000);
    return age >= 18 ? 'Approved' : 'Not Approved';
  }

  const deleteUser = (userId) => {
    axios.delete(`/api/v1/users/${userId}`)
      .then(response => {
        setUsers(users.filter(user => user._id !== userId));
        alert("User Delete succesfull")
      })
      .catch(error => {
        console.log(error);
      });
  }


  const handleInstallmentPlanChange = () => {
    axios.put(`/api/v1/users/${selectedUser._id}`, selectedUser)
      .then(response => {
        setUsers(users.map(user => user._id === selectedUser._id ? selectedUser : user));
        setSelectedUser(null);
        setIsModalVisible(false);
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>

          <div className="col-md-8 card ">
            <div className='heading'>
              <h1>ALL USERS LIST</h1>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>Full Name</th>
                  <th>Date of Birth</th>
                  <th>Loan Balance</th>
                  <th>Used Amount</th>
                  <th>Installment Plan</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{new Date(user.dateOfBirth).toLocaleDateString()}</td>
                    <td>{user.loanBalance}</td>
                    <td>{user.usedAmount}</td>
                    <td>
                      {getStatus(user.dateOfBirth) === 'Approved' ? user.installmentPlan : 'Not Approved'}
                    </td>
                    <td>
                      <button className="btn btn-secondary m-2" onClick={() => { setSelectedUser(user); setIsModalVisible(true); }}>Edit</button>
                      <button className="btn btn-danger" onClick={() => deleteUser(user._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Modal title="Edit User" visible={isModalVisible} onCancel={() => { setSelectedUser(null); setIsModalVisible(false); }} onOk={handleInstallmentPlanChange}>
            <form className='form1'>
              <div className="form-group">
                <label htmlFor="name">Full Name:</label>
                <input type="text" className="form-control" id="name" value={selectedUser?.name} onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })} />
              </div>
              <div className="form-group">
                <label htmlFor="dateOfBirth">Date of Birth:</label>
                <input type="date" className="form-control" id="dateOfBirth" value={selectedUser?.dateOfBirth} onChange={(e) => setSelectedUser({ ...selectedUser, dateOfBirth: e.target.value })} />
              </div>
              <div className="form-group">
                <label htmlFor="loanBalance">Loan Balance:</label>
                <input type="number" className="form-control" id="loanBalance" value={selectedUser?.loanBalance} onChange={(e) => setSelectedUser({ ...selectedUser, loanBalance: e.target.value })} />
              </div>
              <div className="form-group">
                <label htmlFor="usedAmount">Used Amount:</label>
                <input type="number" className="form-control" id="usedAmount" value={selectedUser?.usedAmount} onChange={(e) => setSelectedUser({ ...selectedUser, usedAmount: e.target.value })} />
              </div>
              <div className="form-group">
                <label htmlFor="installmentPlan">Installment Plan:</label>
                <select className="form-control" id="installmentPlan" value={selectedUser?.installmentPlan} onChange={(e) => setSelectedUser({ ...selectedUser, installmentPlan: e.target.value })}>
                  <option value="Plan A">Plan A</option>
                  <option value="Plan B">Plan B</option>
                  <option value="Plan C">Plan C</option>
                </select>
              </div>
            </form>
          </Modal>
        </div>
      </div>
    </Layout>
  )
}

export default AdminDashboard;