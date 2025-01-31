// SellerLoginForm.js
import React, { useContext, useState } from 'react';
import { SellerContext } from '../context/sellerContext';

export const SellerLoginForm = () => {
    const { dispatch } = useContext(SellerContext);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response=await fetch(import.meta.env.SELLER_LOGIN_URL,{
                method: "GET",
                headers:{
                    "Content-type":"application/json"
                },
                body:JSON.stringify({
                    email:formData.email,
                    password:formData.password
                })
                
            })
            const res=response.json();
            dispatch({
                type: 'LOGIN_SELLER',
                payload:res.data
            });
        } catch (error) {
            
        }

        console.log('Seller logged in:', formData);
    };

    return (
        <form className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold mb-6 text-center">Seller Login</h2>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Password:</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">Login</button>
        </form>
    );
};

  
