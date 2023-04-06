import { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import UserMenu from '../components/Layout/UserMenu';
import axios from 'axios';
import { Modal } from 'antd';

const UserDashboard = () => {
  const loggedInUser = JSON.parse(localStorage.getItem('user'));
  console.log("localStorage values ", localStorage)
  console.log("loggedInUser values", loggedInUser);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

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
  }, [loggedInUser._id]);

  const handleUserUpdate = async () => {
    try {
      const response = await axios.put(`/api/v1/users/${selectedUser._id}`, selectedUser);
      setSelectedUser(response.data);
      setIsModalVisible(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-8 card">
            <div className='heading'>
              <h1 className='head1'>USER PROFILE DETAILS</h1>
            </div>
            <table className="table">
              <tbody>
                <tr>
                  <td>Full Name</td>
                  <td>{selectedUser?.name}</td>
                </tr>
                <tr>
                  <td>Date of Birth</td>
                  <td>{selectedUser?.dateOfBirth}</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>{selectedUser?.email}</td>
                </tr>
                <tr>
                  <td>Loan Balance</td>
                  <td>{selectedUser?.loanBalance}</td>
                </tr>
                <tr>
                  <td>Used Amount</td>
                  <td>{selectedUser?.usedAmount}</td>
                </tr>
                <tr>
                  <td>Installment Plan</td>
                  <td>{selectedUser?.installmentPlan}</td>
                </tr>
              </tbody>
            </table>
            <button className="btn btn-primary" onClick={() => setIsModalVisible(true)}>Edit Profile</button>
            <Modal
              title="Edit Profile"
              visible={isModalVisible}
              onOk={handleUserUpdate}
              onCancel={() => setIsModalVisible(false)}
            >
              <form>
                <div className="form-group">
                  <label htmlFor="name">Full Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={selectedUser?.name || ''}
                    onChange={(e) =>
                      setSelectedUser((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={selectedUser?.email || ''}
                    onChange={(e) =>
                      setSelectedUser((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="dateOfBirth">Date of Birth:</label>
                  <input
                    type="date"
                    className="form-control"
                    id="dateOfBirth"
                    value={selectedUser?.dateOfBirth || ''}
                    onChange={(e) =>
                      setSelectedUser((prev) => ({
                        ...prev,
                        dateOfBirth: e.target.value,
                      }))
                    }
                  />
                </div>
              </form>
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;