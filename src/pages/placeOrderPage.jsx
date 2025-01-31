import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CartContext } from '../context/cartContext';
import CheckoutWizard from '../components/CheckoutWizard';
import { UserContext } from '../context/userContext';

export const PlaceOrderPage = () =>
{
    const { state, dispatch } = useContext(CartContext);
    const { cartItems, itemsPrice, shippingPrice, totalPrice, taxPrice, shippingAddress, paymentMethod, loading } = state;
    const { state: userState } = useContext(UserContext)
    const { user } = userState;
    const [order, setOrder] = useState(null);
    const navigate = useNavigate();
    const [orderPlaced, setOrderPlaced] = useState(true)
    const linkBtn = document.querySelector('.download_invoice')
    const link = document.createElement("a");
    link.href = `${import.meta.env.VITE_ORDER_PLACED_URL}/downloadInvoice`
    link.download = "invoice.pdf"; // specify the filename



    const handleOrder = async (e) =>
    {
        e.preventDefault();
        try
        {
            console.log(cartItems[0].id);
            const response = await fetch(import.meta.env.VITE_ORDER_PLACED_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: user._id,
                    cartItems: cartItems,
                    itemsPrice,
                    shippingPrice,
                    taxPrice,
                    paymentMethod,
                    totalPrice
                })
            });

            if (!response.ok)
            {
                throw new Error("Failed to place order");
            }

            const data = await response.json();
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            setOrder(data);
            setOrderPlaced(false)
            navigate('/orderPlaced')
            console.log("Order placed successfully:", data);
        } catch (error)
        {
            console.log("Error at placing order:", error);
            setOrderPlaced(true)
        }
    };

    // const orderPlacedHandler = async () =>
    // {
    //     try
    //     {
    //         const response = await fetch(`${import.meta.env.VITE_ORDER_PLACED_URL}/downloadInvoice`, {
    //             method: "GET",
    //             headers: {
    //                 "Content-Type": "application/pdf",
    //             },
    //         }
    //         )
    //         const resData = response 
    //     } catch (error)
    //     {
    //         console.log("error to download in invoice", error);
    //     }
    // }
    useEffect(() =>
    {
        if (!paymentMethod)
        {
            navigate('/payment');
        }
    }, [paymentMethod]);

    return (
        <div>
            <CheckoutWizard activeStep={2} />
            <h1 className="mb-4 text-xl">Place Order</h1>
            {!loading ? (
                <div>Loading</div>
            ) : cartItems.length === 0 ? (
                <div>
                    Cart is empty. <Link to="/">Go shopping</Link>
                </div>
            ) : (
                <div className="grid md:grid-cols-4 md:gap-5">
                    <div className="overflow-x-auto md:col-span-3">
                        <div className="card p-5">
                            <h2 className="mb-2 text-lg">Shipping Address</h2>
                            <div>
                                {shippingAddress?.country}, {shippingAddress?.state}, {shippingAddress?.city}, {shippingAddress?.pinCode}, {shippingAddress?.streetName}
                                {shippingAddress?.landMark}
                            </div>
                            <div>
                                <Link className="default-button inline-block" to="/shipping">
                                    Edit
                                </Link>
                            </div>
                        </div>
                        <div className="card p-5">
                            <h2 className="mb-2 text-lg">Payment Method</h2>
                            <div>{paymentMethod}</div>
                            <div>
                                <Link className="default-button inline-block" to="/payment">
                                    Edit
                                </Link>
                            </div>
                        </div>
                        <div className="card overflow-x-auto p-5">
                            <h2 className="mb-2 text-lg">Order Items</h2>
                            <table className="min-w-full">
                                <thead className="border-b">
                                    <tr>
                                        <th className="px-5 text-left">Item</th>
                                        <th className="p-5 text-right">Quantity</th>
                                        <th className="p-5 text-right">Price</th>
                                        <th className="p-5 text-right">Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map((item) => (
                                        <tr key={item.id} className="border-b">
                                            <td>
                                                <Link href={`/product/${item.id}`} className="flex items-center">
                                                    <img
                                                        src={item.thumbnail}
                                                        alt={item.title}
                                                        width={50}
                                                        height={50}
                                                        style={{ maxWidth: '100%', height: 'auto' }}
                                                        className="p-1"
                                                    />
                                                    {item.title}
                                                </Link>
                                            </td>
                                            <td className="p-5 text-right">{item.qty}</td>
                                            <td className="p-5 text-right">${item.price}</td>
                                            <td className="p-5 text-right">${item.qty * item.price}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div>
                                <Link className="default-button inline-block" to="/shop">
                                    Edit
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="card p-5">
                            <h2 className="mb-2 text-lg">Order Summary</h2>
                            <ul>
                                <li>
                                    <div className="mb-2 flex justify-between">
                                        <div>Items</div>
                                        <div>${itemsPrice}</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="mb-2 flex justify-between">
                                        <div>Tax</div>
                                        <div>${taxPrice}</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="mb-2 flex justify-between">
                                        <div>Shipping</div>
                                        <div>${shippingPrice}</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="mb-2 flex justify-between">
                                        <div>Total</div>
                                        <div>${totalPrice}</div>
                                    </div>
                                </li>
                                <li className='flex flex-col' >
                                    <button
                                        onClick={handleOrder}
                                        className="primary-button w-full"
                                    >
                                        {orderPlaced ? "Order Place" : "Order Placed "}

                                    </button>
                                    {
                                        orderPlaced ? <></> :
                                            <a
                                                className='download_invoice m-3  ring-deep-orange-800 w-full '

                                                href={`${import.meta.env.VITE_ORDER_PLACED_URL}/downloadInvoice`}
                                                download="invoice"
                                                target="_blank"
                                                rel="noreferrer"

                                            >
                                                invoice
                                            </a>
                                    }
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

