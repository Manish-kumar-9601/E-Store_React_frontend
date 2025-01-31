// ShippingAddressPage.js
import React, { useContext, useEffect, useState } from 'react';
import CheckoutWizard from '../components/CheckoutWizard';
import {  useNavigate } from 'react-router-dom';
import { CartContext } from '../context/cartContext';
import { UserContext } from '../context/userContext';

export const ShippingAddressPage = () =>
{
    const { state, dispatch } = useContext(CartContext)
    const { state: userState } = useContext(UserContext)
    const { user } = userState;
    const navigate=useNavigate()
    console.log(user);
    console.log(user?._id);
    
    const [formData, setFormData] = useState({
        country: '',
        state: '',
        city: '',
        pinCode: '',
        streetName: '',
        roadName: '',
        landMark: '',

    })

    const handleChange = (e) =>
    {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    }

    const submitHandler = async (e) =>
    {
        e.preventDefault()
        dispatch({
            type: 'SAVE_SHIPPING_ADDRESS',
            payload: {
                country: formData.country,
                state: formData.state,
                city: formData.city,
                pinCode: formData.pinCode,
                streetName: formData.streetName,
                roadName: formData.roadName,
                landMark: formData.landMark,
            }
        });
        console.log(state.shippingAddress)
        const response = await fetch(`${import.meta.env.VITE_USER_SHIPPING_ADDRESS_URL}`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                userId: user?._id,
                country: formData.country,
                state: formData.state,
                city: formData.city,
                streetName: formData.streetName,
                pinCode: formData.pinCode,
                landmark: formData.landMark,
                road: formData.roadName
            })
        })
        const resData = await response.json();
        console.log("resData at addressForm", resData);
        navigate('/payment');
    };

    return (
        <div>
            <CheckoutWizard activeStep={0} />
            <form className="mx-auto max-w-screen-md" onSubmit={submitHandler}>
                <h1 className="mb-4 text-xl">Shipping Address</h1>
                <div className="mb-4">
                    <label htmlFor="fullName">Full Name</label>
                    <p>  </p>

                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Address:</label>
                    <div className="addressArea pl-6">
                        <label className="flex justify-between gap-2 text-gray-700 font-bold mb-2">Country:
                            <input type="text" name="country" value={formData.country} onChange={(e) => handleChange(e)} required className="w-[80%] text-black font-normal px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </label>
                        <label className="flex justify-between gap-2 text-gray-700 font-bold mb-2">state:
                            <input type="text" name="state" value={formData.state} onChange={(e) => handleChange(e)} required className="w-[80%] text-black font-normal px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </label>

                        <label className="flex justify-between gap-2 text-gray-700 font-bold mb-2">City:
                            <input type="text" name="city" value={formData.city} onChange={(e) => handleChange(e)} required className="w-[80%] text-black font-normal px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </label>
                        <label className="flex justify-between gap-2 text-gray-700 font-bold mb-2">Street:
                            <input type="text" name="streetName" value={formData.streetName} onChange={(e) => handleChange(e)} required className="w-[80%] text-black font-normal px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </label>
                        <label className="flex justify-between gap-2 text-gray-700 font-bold mb-2">Road:
                            <input type="text" name="roadName" value={formData.roadName} onChange={(e) => handleChange(e)} required className="w-[80%] text-black font-normal px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </label>
                        <label className="flex justify-between gap-2 text-gray-700 font-bold mb-2">Land Mark:
                            <input type="text" name="landMark" value={formData.landMark} onChange={(e) => handleChange(e)} required className="w-[80%] text-black font-normal px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </label>
                        <label className="flex justify-between gap-2 text-gray-700 font-bold mb-2">Pin Code:
                            <input type="text" name="pinCode" value={formData.pinCode} onChange={(e) => handleChange(e)} required className="w-[80%] text-black font-normal px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </label>
                    </div>
                </div>

                <div className="mb-4 flex justify-between">
                    <button className="primary-button">Next</button>
                </div>
            </form>
        </div>
    );
};


