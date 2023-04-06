import React, { useState } from 'react';
import axios from 'axios';

const RegisterUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/v1/user/register', {
        name,
        email,
        password,
        dateOfBirth
      });
      console.log(data);
      // Clear input fields
      setName('');
      setEmail('');
      setPassword('');
      setDateOfBirth('');
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div>
      
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
      <h1 className='heading1' >User Registration</h1>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
        <div>
          <label>Date of Birth:</label>
          <input
          className='abc'
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterUser;