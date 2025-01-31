import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../context/cartContext';

export const QtyOption = ({ currentQty,  item,  }) =>
{
    const {state,dispatch}=useContext(CartContext)
    const [qty, setQty] = useState(currentQty)
    useEffect(()=>{

         
            dispatch({
                type: 'ADD_TO_CART',
                payload: { ...item, qty: qty }
            });
        

    },[qty])
 
    const handleChange = (e) =>   {
        const newQty = Number(e.target.value); setQty(newQty);
        
    }
        return (
            <select
                value={qty}
                onChange={(e) =>
                    handleChange(e)
                // setQty(e.target.numberValue)
                }
            >
                {[...Array(item.stock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                        {x + 1}
                    </option>
                ))}
            </select>
        )
    }
