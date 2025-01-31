import Logo from '../assets/brand_logo.png';
import { Link } from 'react-router-dom';
import React, { useContext } from 'react';
import './Navbar.css';
import { FaShoppingCart } from "react-icons/fa";
import { SearchBar } from './searchBar';
import { CartContext } from '../context/cartContext';
import { UserContext } from '../context/userContext';

const Navbar = () => {
  const { state: userState, dispatch } = useContext(UserContext);
  const { isAuthenticated, logout } = userState;
  console.log(isAuthenticated);
  // useSession()
  const { state } = useContext(CartContext);
  const { cartItems } = state;
  const handleLogout = () => {
    dispatch({
      type: "LOGOUT"
    });
  };
  return (
    <nav className="navbar">
      <div className="navbar-main">
        <a href="/" className="navbar-logo mr-2" >
          <img src={Logo} alt="Logo"    />
        </a>
        <div className='flex gap-20'>
          <ul className="navbar-links flex ">
            <li><a href="/">Home</a></li>
            <li><a href="/shop">Shop</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/accessories">About Us</a></li>
          </ul>
          <SearchBar />
        </div>
        <div className="navbar-icons">
          {
            isAuthenticated ? <button onClick={handleLogout} className='bg-red-600 p-1 rounded-md ' >logout</button> : <Link to={'/login'} className='navbar-auth-btn text-white items-center flex' >
              login
            </Link>
          }
          <Link to="/cartPage">
            <FaShoppingCart className='cart_icons' />
            {cartItems.length === 0 && isAuthenticated ? <></> :
              <span className={`badge ${isAuthenticated ?'':'hidden'}`}>{cartItems.length}</span>
            }
          </Link>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
