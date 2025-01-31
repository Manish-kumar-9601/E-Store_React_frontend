import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CartContext } from '../context/cartContext'
import { UserContext } from '../context/userContext'
import { FiSend } from "react-icons/fi";
export default function AddToCart ({
    product,
    showQty = true,
    increasePerClick = false,
})
{
    const navigate = useNavigate()
    const [qty, setQty] = useState(1)
    const { state, dispatch } = useContext(CartContext)
    const { state: userState } = useContext(UserContext)
    const { isAuthenticated, user } = userState
    const [added, setAdded] = useState(false);
    const effect=' shadow-[-1px_-1px_5px_rgba(255,_255,_255,_0.6),_1px_1px_5px_rgba(0,_0,_0,_0.3),inset_-2px_-2px_5px_rgba(255,_255,_255,_1),inset_2px_2px_4px_rgba(0,_0,_0,_0.3)]  text-violet-500'

    const addToCartHandler = () =>
    {
        console.log("state", isAuthenticated, user);
        if (!isAuthenticated)
        {
            navigate('/authPage')
            return false
        }

        let newQty = qty
        if (increasePerClick)
        {
            const existItem = state.cartItems.find((x) => x.id === product.id)
            if (existItem)
            {
                if (existItem.qty + 1 <= product.stock)
                {
                    newQty = existItem.qty + 1
                    console.log("new qty at add to cart", newQty, "exist", existItem.qty);
                }
            }
        }
        const newProduct = { ...product, qty: newQty }
        console.log("new product", newProduct)
        console.log("new qty at addto cart", newQty)
        dispatch({
            type: 'ADD_TO_CART',
            payload: { ...product, qty: newQty }
        })
        console.log("product stock", product.stock);
        setAdded(true);
        setTimeout(() =>
        {
            setAdded(false);
        }, 500);
    }

    return (
        <div className="add-to-cart-container">
            {product.stock > 0 && showQty && (
                <div className="quantity-selector flex my-1">
                    <div>Qty</div>
                    
                    <div>
                        <select
                            value={qty}
                            onChange={(e) => setQty(Number(e.target.value))}
                            className="quantity-select flex flex-row"
                        >
                            {[...Array(product.stock).keys()].map((x) => (
                                <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            )}
            <div>
            
                {/* {product.stock > qty ? ( */}
                {true ? (

<div className="  flex items-center justify-center  w-full">
<button onClick={addToCartHandler}
      className={`${added?effect:''}
        px-4 py-2 rounded-full bg-orange-400
        flex items-center gap-2 
        text-white font-semibold
        shadow-[-5px_-5px_10px_rgba(255,_255,_255,_0.8),_5px_5px_10px_rgba(0,_0,_0,_0.25)]
        
        transition-all

        
    `}
    >
      <FiSend />
      <span>Add to cart</span>
    </button>
</div>


                ) : (
                    <button
                        disabled
                        className="outOfStockBtn"
                    >
                        Out of stock
                    </button>
                )}
            </div>
        </div>
    )
}