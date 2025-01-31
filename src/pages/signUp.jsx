import React, { useContext, useState } from 'react';
import './signUp.css'; 
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';

export const SignUp = () =>
{
    const { signup } = useContext(UserContext)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        mobileNumber: ''
    });
    const navigate = useNavigate()

    const handleChange = (e) =>
    {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) =>
    {
        e.preventDefault();
        const isSignUp = signup(formData.name, formData.email, formData.mobileNumber, formData.password)
        if (isSignUp)
        {
            navigate('/login');
        }
    };


    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit} encType="application/x-www-form-urlencoded">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="mobileNumber">Mobile Number</label>
                    <input
                        type="tel"
                        id="mobileNumber"
                        name="mobileNumber"
                        value={formData.mobileNumber}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};


