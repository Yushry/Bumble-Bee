import React, { useState } from 'react';
import axios from 'axios';
import { NavLink, Link } from "react-router-dom";

const UserLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post('/api/v1/user/login', {
                email,
                password
            });

            // Save token and user data to local storage
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            // Redirect to dashboard page
            window.location.href = '/userDashboard';
            alert('Login successful');
        } catch (error) {
            alert('Something went wrong');
        }
    };

    return (
        <div>
            

            <form onSubmit={handleSubmit}>
            <h1 className='heading1' >User Login</h1>
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

                <h4 className='h3class'>CREATE NEW ACCOUNT</h4>

                <Link to={"/userRegisterPage"} className='h2class'>
                    <h4 className='submit'>Signup</h4>
                </Link>

            </form>
        </div>
    );
};

export default UserLogin;