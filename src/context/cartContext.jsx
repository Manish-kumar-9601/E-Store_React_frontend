import React, { createContext, useContext, useReducer } from 'react';
import Cookies from 'js-cookie';

const initialState = Cookies.get('cart')
    ? { ...JSON.parse(Cookies.get('cart')), loading: true }
    : {
        cartItems: [],
        itemsPrice: 0,
        shippingPrice: 0,
        totalPrice: 0,
        taxPrice: 0,
        shippingAddress:
        {
            country: '',
            state: '',
            city: '',
            pinCode: '',
            streetName: '',
            roadName: '',
            landMark: ''
        },
        paymentMethod: '',
        loading: false

    };
export const CartContext = createContext(initialState);

const addDecimals = (num) =>
{
    return (Math.round(num * 100) / 100).toFixed(2);
};

const calculatePrices = (cartItems) =>
{
    console.log("cartItems", cartItems);
    const itemsPrice = addDecimals(
        cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
    const shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 100);
    const taxPrice = addDecimals(Number(0.15 * itemsPrice));
    const totalPrice = addDecimals(
        Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice)
    );

    return { itemsPrice, shippingPrice, taxPrice, totalPrice };
};


const cartReducer = (state, action) =>
{
    switch (action.type)
    {
        case 'ADD_TO_CART': {
            const item = action.payload;
            const existItem = state.cartItems.find((x) => x.id === item.id);
            const cartItems = existItem
                ? state.cartItems.map((x) => (x.id === existItem.id ? item : x))
                : [...state.cartItems, item];

            const newState = {
                ...state,
                cartItems,
                ...calculatePrices(cartItems)
            };

            Cookies.set('cart', JSON.stringify(newState));
            return {
                ...newState,
                loading: true
            }
        }
        case "UPDATE_PRICE_FROM_CART": {
            const item = action.payload;
            const existItem = state.cartItems.find((x) => x.id === item.id);
            const cartItems = existItem
                ? state.cartItems.map((x) => (x.id === existItem.id ? item : x))
                : [...state.cartItems, item];

            const newState = {
                ...state,
                cartItems,
                ...calculatePrices(cartItems)
            };
            Cookies.set('cart', JSON.stringify(newState));
            return newState
        }
        case 'REMOVE_FROM_CART': {
            const cartItems = state.cartItems.filter((x) => x.id !== action.payload);
            const newState = {
                ...state,
                cartItems,
                ...calculatePrices(cartItems)
            };

            Cookies.set('cart', JSON.stringify(newState));
            return newState;
        }
        case "CLEAR_FROM_CART": { return { ...state, cartItems: [], itemsPrice: 0, shippingPrice: 0, totalPrice: 0, taxPrice: 0 }; }
        case 'SAVE_SHIPPING_ADDRESS': {
            const newState = {
                ...state,
                shippingAddress: action.payload
            };
            Cookies.set('cart', JSON.stringify(newState));
            return newState;
        }

        case 'SAVE_PAYMENT_METHOD': {
            const newState = {
                ...state,
                paymentMethod: action.payload
            };
            Cookies.set('cart', JSON.stringify(newState));
            return newState;
        }

        case 'HIDE_LOADING':
            return { ...state, loading: false };

        default:
            return state;
    }
};

export const CartProvider = ({ children }) =>
{
    const [state, dispatch] = useReducer(cartReducer, initialState);


    const value = {
        ...state,
        addToCart,
        removeFromCart,
        saveShippingAddress,
        savePaymentMethod,
        hideLoading,
    };

    return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>;
};

export const useCart = () =>
{
    const context = useContext(CartContext);
    if (context === undefined)
    {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

// function use 
export const addToCart = (item) =>
{
    dispatch({ type: 'ADD_TO_CART', payload: item });
};

export const removeFromCart = (id) =>
{
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
};

export const saveShippingAddress = (address) =>
{
    dispatch({ type: 'SAVE_SHIPPING_ADDRESS', payload: address });
};

export const savePaymentMethod = (method) =>
{
    dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: method });
};

export const hideLoading = () =>
{
    dispatch({ type: 'HIDE_LOADING' });
};
