import React, { useState } from 'react';
import axios from 'axios';
import '../components/Style/AdminLoginPage.css'
import toast from 'react-hot-toast';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/v1/admin/login', {
        email,
        password,
      });

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));



      window.location.href = '/adminDashboard';

        // Show success toast message here
        alert('Login successful');
            
    } catch (error) {
      console.log(error);
      // Show error toast message here
      alert('Something went wrong');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1 className="heading1">Admin Login</h1>

        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;