import { useContext, useEffect, useState } from 'react';
import { Card } from './components/card.jsx';
import CartSidebar from './components/cartSideBar.jsx';
import { Carousel } from './components/carousel.jsx';
import { useLocation } from 'react-router-dom';
import { ProductDataContext } from './context/productDataContext.jsx';
import { UserContext } from './context/userContext.jsx';

export const HomePage = () =>
{
  const { state, dispatch } = useContext(ProductDataContext)
  const {state:userState}=useContext(UserContext)
  const {user} =userState
  console.log("user login",user);
  const path = useLocation().pathname
  console.log(path);
  const [data, setData] = useState([]);
  const {productData} =state
  const location = useLocation().pathname
  useEffect(() =>
  {
      setData(productData)
    console.log("path ",location);
  }, [state]);

  console.log(data);

  const fetchHandle=async()=>{
    const res=await fetch('http://localhost:3000/',{
      method:"GET",
      headers:{
        "Content-type":"application/json"
      }
    })
    console.log(res);
  }
  fetchHandle()
  return (
    <>
      
      {data.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <>
          <section className="hero-section">

            <Carousel defaultItems={data} />
          </section>
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
