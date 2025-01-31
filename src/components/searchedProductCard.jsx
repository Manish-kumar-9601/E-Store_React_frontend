import React from 'react';
import AddToCart from './addToCart';

export const SearchProductCard = ({ product }) =>
{
    return (<>
        <div className="flex border border-gray-300 rounded-lg p-4 w-full mx-auto shadow-lg">
            <div className="flex-shrink-0 mr-4">
                <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full rounded-lg"
                />
            </div>
            <div className="flex-grow">
                <h2 className="text-xl font-bold">{product.title}</h2>
                <p className="text-gray-600">{product.description}</p>
                <div className="flex items-center mt-2">
                    <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
                    {/* <span className="ml-2 text-gray-600">{product.reviews} reviews</span> */}
                </div>
                {/* <p className="text-gray-600 mt-1">{product.sales} bought in past month</p> */}
                <div className="flex items-center mt-2">
                    {/* <span className="text-2xl font-bold text-red-600">₹{product.price}</span> */}
                    <span className="line-through ml-2 text-gray-500">M.R.P.: ₹{product.price}</span>
                    {/* <span className="ml-2 text-red-600">({product.discount}% off)</span> */}
                </div>
                <p className="text-gray-600 mt-1">FREE delivery by
                    {/* {product.deliveryDate} */}
                </p>
                <p className="text-gray-600 mt-1">Service: 
                    {/* {product.service} */}

                </p>
                <AddToCart product={product}  />
            </div>
        </div>

    </>
    );
};
