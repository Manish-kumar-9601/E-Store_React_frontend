// SellerContext.js
import React, { createContext, useReducer, useContext } from 'react';
import Cookies from 'js-cookie';
export const SellerContext = createContext();

const initialState = Cookies.get("seller")?{...JSON.parse(Cookies.get("seller"))}:{
    sellerId:'',
    seller: {
        name: '',
        email: '',
        password: '',
        PAN:'',
        contactNumber: '',
        address: {
            country: '',
            state:'',
            city: '',
            pinCode: '',
            streetName: '',
            roadName: '',
            landMark: '',
        }
    },
    isAuthenticated: false
};

const sellerReducer = (state, action) => {
    switch (action.type) {
        case 'REGISTER_SELLER':
            return {
                ...state,
                seller: action.payload,
                isAuthenticated: true
            };
        case 'LOGIN_SELLER':
            return {
                ...state,
                sellerId:action.payload,
                isAuthenticated: true
            };
        case 'LOGOUT_SELLER':
            return {
                ...state,
                seller: initialState.seller,
                isAuthenticated: false
            };
        default:
            return state;
    }
};

export const SellerProvider = ({ children }) => {
    const [state, dispatch] = useReducer(sellerReducer, initialState);
    console.log("seller state",state.sellerId);
    return (
        <SellerContext.Provider value={{ state, dispatch }}>
            {children}
        </SellerContext.Provider>
    );
};

 
