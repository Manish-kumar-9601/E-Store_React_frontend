import React, { useContext } from 'react';
import { CartContext } from '../context/cartContext';
import './cartPage.css'; 
import { Link, useNavigate } from 'react-router-dom';
import { QtyOption } from '../components/qtyOption';

export default function CartPage ()
{
    const { state, dispatch } = useContext(CartContext);
    const { loading, cartItems, itemsPrice } = state;
    const navigate=useNavigate()
    
    // const addToCartHandler = (product, qty) =>
    // {
    //     dispatch({ type: 'ADD_TO_CART', payload: { ...product, qty } });
    // };

    const removeFromCartHandler = (id) =>
    {
        const item = cartItems.find(item => item.id === id);
        dispatch({ type: 'REMOVE_FROM_CART', payload: item });
        
    };

    return (
        <div>
            <h1 className="mb-4 text-xl">Shopping Cart</h1>
            {!loading ? (
                <div>Loading...</div>
            ) : cartItems.length === 0 ? (
                <div>
                    Cart is empty. <Link href="/">Go shopping</Link>
                </div>
            ) : (
                <div className="grid md:grid-cols-4 md:gap-5">
                    <div className="overflow-x-auto md:col-span-3">
                        <table className="min-w-full">
                            <thead className="border-b">
                                <tr>
                                    <th className="p-5 text-left">Product</th>
                                    <th className="p-5 text-right">Quantity</th>
                                    <th className="p-5 text-right">Price</th>
                                    <th className="p-5">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map((item) => (
                                    <tr key={item.id} className="border-b">
                                        <td>
                                            <Link
                                                href={`/product/${item.id}`}
                                                className="flex items-center"
                                            >
                                                <img
                                                    src={item.thumbnail}
                                                    alt={item.title}
                                                    
                                                    className="p-1  object-contain"
                                                />
                                                {item.name}
                                            </Link>
                                        </td>
                                        <td className="p-5 text-right">
                                            <QtyOption item={item} currentQty={item.qty} />
                                        </td>
                                        <td className="p-5 text-right">${item.price}</td>
                                        <td className="p-5 text-center">
                                            <button
                                                className="default-button"
                                                onClick={() => removeFromCartHandler(item.id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className='absolute right-0'>
                        <div className="card p-5 ">
                            <ul>
                                <li>
                                    <div className="pb-3 text-xl">
                                        Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)}) : $
                                        {itemsPrice}
                                    </div>
                                </li>
                                <li>
                                    <button
                                        onClick={() => navigate('/shipping')}
                                        className="primary-button w-full"
                                    >
                                        Proceed to checkout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
