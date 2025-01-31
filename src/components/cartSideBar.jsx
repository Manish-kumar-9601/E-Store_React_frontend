import React, { useContext, useEffect, useRef, useState } from 'react';
import { CartContext } from '../context/cartContext';
import './cartSideBar.css';
import { Link, useLocation } from 'react-router-dom';  
import { FaCircleArrowRight } from "react-icons/fa6";
import { QtyOption } from './qtyOption';
import { UserContext } from '../context/userContext';

export default function CartSidebar() {
    const { state: userState } = useContext(UserContext);
    const { isAuthenticated } = userState;
    const { state, dispatch } = useContext(CartContext);
    const [closeBar, setCloseBar] = useState(true);
    const [newQty, setNewQty] = useState(null);
    const { loading, cartItems, itemsPrice } = state;
    const sideBarRef = useRef(null);

    console.log("update price", itemsPrice);
    console.log("is auth", isAuthenticated);  

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sideBarRef.current && !sideBarRef.current.contains(event.target)) {
                setCloseBar(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [sideBarRef]);

    useEffect(() => {
        if (isAuthenticated) {
            setCloseBar(true);
        }
    }, [isAuthenticated, cartItems]);

    const removeFromCartHandler = (id) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: id });
    };

    const pathname = useLocation().pathname;

    return (
        <div
            ref={sideBarRef}
            className={
                cartItems.length > 0 && closeBar &&
                (pathname === '/' || pathname.indexOf('/shop') >= 0)
                    ? 'cart-sidebar'
                    : 'cart-sidebar hidden'
            }
        >
            {!loading ? (
                <div className="loading">
                    <button className='m-3' onClick={() => setCloseBar(false)}>
                        <FaCircleArrowRight className='text-2xl' />
                    </button>
                    Loading...
                </div>
            ) : cartItems.length === 0 ? (
                <div className="empty">
                    <button className='m-3' onClick={() => setCloseBar(false)}>
                        <FaCircleArrowRight className='text-xl' />
                    </button>
                    Cart is empty
                </div>
            ) : (
                <>
                    <button className='m-3' onClick={() => setCloseBar(false)}>
                        <FaCircleArrowRight className='text-2xl' />
                    </button>
                    <div className="subtotal">
                        <div>Subtotal</div>
                        <div className="price">${itemsPrice}</div>
                        <div>
                            <Link
                                to="/cartPage"
                                className="w-full text-center p-1 rounded-2xl border-2"
                            >
                                Go to cart
                            </Link>
                        </div>
                        {cartItems.map((item, index) => (
                            <div key={index}>
                                <hr />
                                <div className="cart-item">
                                    <Link to={`/product/${item.id}`} className="flex items-center cart-item-link">
                                        <img
                                            src={item.thumbnail}
                                            alt={item.title}
                                            className='cart-item-img'
                                        />
                                    </Link>
                                    <div className='flex justify-center items-center gap-5'>
                                        <QtyOption item={item} currentQty={item.qty} setNewQty={setNewQty} stock={item.stock} />
                                        <button
                                            className="delete-button"
                                            onClick={() => removeFromCartHandler(item.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                                <hr />
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}


 