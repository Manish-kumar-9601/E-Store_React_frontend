// UserContext.js
import React, { createContext, useReducer } from 'react';
import Cookies from 'js-cookie';
 

export const UserContext = createContext();

const initialState = Cookies.get('user') ? { ...JSON.parse(Cookies.get('user')), loading: true } : {
    user: null,
    signUpUser: null,
    isAuthenticated: false,
    loading: false,
    error: null
};


const userReducer = (state, action) =>
{
    switch (action.type)
    {
        case 'LOGIN_REQUEST':
            return { ...state, loading: true, error: null };
        case 'LOGIN_SUCCESS':
            return { ...state, user: action.payload, isAuthenticated: true, loading: false };
        case 'LOGIN_FAILURE':
            return { ...state, error: action.payload, loading: false };
        case 'SIGNUP_REQUEST':
            return { ...state, loading: true, error: null };
        case 'SIGNUP_SUCCESS':
            return { ...state, signUpUser: action.payload, isAuthenticated: true, loading: false };
        case 'SIGNUP_FAILURE':
            return { ...state, error: action.payload, loading: false };
        case 'LOGOUT': return { ...state, user: null, isAuthenticated: false };
        default: return state;
    }
}
            export const UserProvider = ({ children }) =>
            {
                const [state, dispatch] = useReducer(userReducer, initialState);


                const login = async (email, password) =>
                {
                    dispatch({ type: 'LOGIN_REQUEST' });
                    try
                    {
                        const response = await fetch(import.meta.env.VITE_USER_LOGIN_URL, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                email,
                                password,
                            }),
                        });

                        if (!response.ok)
                        {
                            throw new Error('Network response was not ok');
                        }

                        const data = await response.json();
                        console.log("login resData", data.user);
                        console.log('Form data submitted:', data);
                        if (data)
                        {
                            dispatch({ type: 'LOGIN_SUCCESS', payload: data.user });
                            console.log(state.user);
                            return true;
                        } else
                        {
                            console.log("Failed to login", data);
                        }
                    } catch (error)
                    {
                        dispatch({ type: 'LOGIN_FAILURE', payload: error.message });
                        console.error('Error:', error);
                    }
                };

                const signup = async (name, email, mobileNumber, password) =>
                {
                    dispatch({ type: 'SIGNUP_REQUEST' });
                    try
                    {
                        const response = await fetch(import.meta.env.VITE_USER_SIGN_UP_URL, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                name,
                                password,
                                email,
                                mobileNumber,
                            }),
                        });

                        if (!response.ok)
                        {
                            throw new Error('Network response was not ok');
                        }

                        const data = await response.json();
                        dispatch({ type: 'SIGNUP_SUCCESS', payload: data.user });
                        console.log("context ", state.signUpUser);
                        console.log("signUP resData", data);
                        console.log('Form data submitted:', data);
                        if (data)
                        {
                            return true;
                        } else
                        {
                            console.log("Failed to sign up", data);
                        }
                    } catch (error)
                    {
                        dispatch({ type: 'SIGNUP_FAILURE', payload: error.message });
                        console.error('Error:', error);
                    }
                };

                const logout = () =>
                {
                    dispatch({ type: 'LOGOUT' });
                };

                return (
                    <UserContext.Provider value={{ state, login, signup, logout,dispatch }}>
                        {children}
                    </UserContext.Provider>
                );
            };
