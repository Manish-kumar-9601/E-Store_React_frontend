import React, { useContext, useState } from 'react';
import { SellerContext } from '../context/sellerContext';

export const SellerRegisterForm = () =>
{
    const { dispatch } = useContext(SellerContext);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        PAN: '',
        contactNumber: '',

    });

    const handleChange = (e) =>
    {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // const handleAddressChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData({
    //         ...formData,
    //         address: {
    //             ...formData.address,
    //             [name]: value
    //         }
    //     });
    // };

    const handleSubmit = async (e) =>
    {
        e.preventDefault();

        console.log('Seller registered:', formData);
        try
        {

            const response = await fetch(import.meta.env.VITE_SELLER_REGISTER_URL, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    PAN: formData.PAN,
                    contactNumber: formData.contactNumber,
                })
            })
            const data = response.json()
            console.log("seller reg", data);
            dispatch({
                type: 'REGISTER_SELLER',
                payload: data
            });
        } catch (error)
        {
            console.error("Error at seller register", error);
        }
    };

    return (
        <form className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold mb-6 text-center">Seller Registration</h2>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Password:</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">PAN No:</label>
                <input type="text" name="PAN" value={formData.PAN} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Contact Number:</label>
                <input type="number" name="contactNumber" value={formData.contactNumber} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">Register</button>
        </form>
    );
};
