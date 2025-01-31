import React, { useContext, useEffect, useState } from 'react';
import { ProductDataContext } from '../context/productDataContext';

import CartSidebar from '../components/cartSideBar';
import { Card } from '../components/card';
import { UserContext } from '../context/userContext';

export const ShoppingPage = () =>
{
  const {state:userState}=useContext(UserContext)
  const {user} =userState
  console.log("user login",user?._id);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { state, dispatch } = useContext(ProductDataContext);
  const { productData } = state;

  useEffect(() =>
  {
    setData(productData)
    setLoading(false)
    console.log("path ", data);
  }, [productData]);


  return (

    <>

{loading ? (
        <p>Loading...</p>
      ) : (
        <>
           
          <div className="productCard">


            <Card
              data={data}
              />
            <CartSidebar />

          </div>
        </>
      )}

      </>
  );
};


