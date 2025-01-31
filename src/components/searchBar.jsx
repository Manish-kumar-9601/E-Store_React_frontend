import { Input  } from '@material-tailwind/react'
import React, { useContext, useEffect, useState } from 'react'
import { IoSearch } from "react-icons/io5";
import { ProductDataContext } from '../context/productDataContext';
import { useNavigate } from 'react-router-dom';
// import { redirect } from 'react-router-dom';

export const SearchBar = () => {
  const {state,dispatch}=useContext(ProductDataContext)
  const {productData}=state;
  const [products,setProducts]=useState([])
  const navigate=useNavigate()
  useEffect(() => { 
    if (productData) 
      { setProducts(productData); 
        console.log("product data is", products); } }, [productData]);
    const [searchInput,setSearchInput]=useState()
    const searchHandler=()=>{
      console.log(searchInput);
      if(searchInput===''){  setSearchInput(products) 
        return;
      }
      navigate('/searchResult')

      const filterSearch=products.filter((item)=> {
        return  Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())})
      console.log("filter",filterSearch.length !==0);
      if(filterSearch.length !==0){
        console.log(filterSearch);
        dispatch({
          type:"STORE_SEARCH_RESULT",
          payload:filterSearch
        })
        navigate('/searchResult')
      }
// console.log(productData);
    }
  return (
    <label htmlFor="search" className='flex  items-center '>
        <Input className='rounded-l py-[.3rem] px-6 text-slate-50' onChange={(e)=>setSearchInput(e.target.value)} />
        <button onClick={searchHandler} >
          <IoSearch className='text-white text-[2rem] rounded-r-full bg-orange-800 p-1 ' /></button>
    </label>
  )
}