// PaymentMethodPage.js
import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {   useNavigate } from 'react-router-dom';
import { CartContext } from '../context/cartContext';
import CheckoutWizard from '../components/CheckoutWizard';

export const PaymentMethodPage = () => {
    const { handleSubmit, register, formState: { errors }, setValue } = useForm();
    const { state, dispatch } = useContext(CartContext)
    const { shippingAddress, paymentMethod } = state;
    const navigate = useNavigate();
    console.log("at paymentpage",!shippingAddress ,"adres",shippingAddress );
    useEffect(() => {
        if (!shippingAddress ) {
            return navigate('/shipping');
        }
        setValue('paymentMethod', paymentMethod);
    }, [paymentMethod, history, setValue, shippingAddress]);

    const submitHandler = ({ paymentMethod }) => {
        dispatch({
            type: 'SAVE_PAYMENT_METHOD',
            payload: paymentMethod
        });
        console.log("emthod",state.paymentMethod)

        navigate('/placeOrder');
    };

    return (
        <div>
            <CheckoutWizard activeStep={1} />
            <form className="mx-auto max-w-screen-md" onSubmit={handleSubmit(submitHandler)}>
                <h1 className="mb-4 text-xl">Payment Method</h1>
                {['PayPal', 'Stripe', 'CashOnDelivery'].map((payment) => (
                    <div key={payment} className="mb-4">
                        <input
                            name="paymentMethod"
                            className="p-2 outline-none focus:ring-0"
                            id={payment}
                            type="radio"
                            value={payment}
                            {...register('paymentMethod', { required: 'Please select payment method' })}
                        />
                        <label className="p-2" htmlFor={payment}>{payment}</label>
                    </div>
                ))}
                {errors.paymentMethod && (
                    <div className="text-red-500">{errors.paymentMethod.message}</div>
                )}
                <div className="mb-4 flex justify-between">
                    <button className="primary-button">Next</button>
                </div>
            </form>
        </div>
    );
};

 
