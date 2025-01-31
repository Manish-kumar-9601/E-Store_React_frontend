import React from 'react';
import './footer.css';
import Logo from '../assets/brand_logo.png';
import { useLocation } from 'react-router-dom';

export const Footer = () =>
{


  const location=useLocation().pathname
  console.log("path ",location);
  return (
    <footer className={`bg-gray-100 p-6 text-center ${location=='/' || location =='/shop'  || location=='placeOrder'?'':'absolute w-full bottom-0 h-36 mt-4'}mt-2.5 hidden `}>
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="mb-6 md:mb-0">
          <img src={Logo} alt="Logo" className="w-24 h-24" />
        </div>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
          <div>
            <h2 className="text-lg font-semibold mb-4">About</h2>
            <ul className="list-none space-y-2">
              <li><a href="#" className="text-gray-800 hover:text-blue-500">Flowbite</a></li>
              <li><a href="#" className="text-gray-800 hover:text-blue-500">Tailwind CSS</a></li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-4">Follow Us</h2>
            <ul className="list-none space-y-2">
              <li><a href="#" className="text-gray-800 hover:text-blue-500">Github</a></li>
              <li><a href="#" className="text-gray-800 hover:text-blue-500">Discord</a></li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-4">Legal</h2>
            <ul className="list-none space-y-2">
              <li><a href="#" className="text-gray-800 hover:text-blue-500">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-800 hover:text-blue-500">Terms & Conditions</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-6 border-t border-gray-200 pt-4">
        <p className="text-sm text-gray-600">© 2024 NEO CLOTHINES™</p>
        <div className="flex justify-center mt-4">
          <a href="#" className="text-gray-800 hover:text-blue-500 mx-2">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="#" className="text-gray-800 hover:text-blue-500 mx-2">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#" className="text-gray-800 hover:text-blue-500 mx-2">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="text-gray-800 hover:text-blue-500 mx-2">
            <i className="fab fa-github"></i>
          </a>
          <a href="#" className="text-gray-800 hover:text-blue-500 mx-2">
            <i className="fab fa-dribbble"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};