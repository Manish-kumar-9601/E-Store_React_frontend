import React from 'react'
import { Link } from 'react-router-dom'
import './authPage.css'
export const AuthPage = () =>
{
    return (
        <section className="auth-main">

            <div className="login-btn  ">
                <Link to={'/login'} className='btn'>Login </Link>
            </div>
            <div className="signUp-btn ">
                <Link to={'/signUp'} className='btn' >Sign-Up</Link>
                <p className='auth-disclaimer'>if account is not created</p>
            </div>
        </section>
    )
}
