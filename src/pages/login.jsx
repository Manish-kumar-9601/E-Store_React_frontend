import React, { useContext, useState } from 'react';
import './login.css'; // Assuming you have a CSS file for styling
import { UserContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';

export const Login = () =>
{
    const navigate=useNavigate()
    const {  login } = useContext(UserContext)
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

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
        console.log('Form data submitted:', formData);
        const isLogin=login(formData.email,formData.password)
        if(isLogin){
            navigate('/shop');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
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
                <button type="submit">Login</button>
            </form>
        </div>
    );
};


