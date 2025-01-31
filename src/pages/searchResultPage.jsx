import React, { useContext } from 'react'
import { ProductDataContext } from '../context/productDataContext'
import { SearchProductCard } from '../components/searchedProductCard';
import CartSidebar from '../components/cartSideBar';

export const SearchResultPage = () =>
{
    const { state, dispatch } = useContext(ProductDataContext)
    const { searchResultProduct } = state
    console.log("search result:",searchResultProduct);
    return (
<>
{
    searchResultProduct.map((item,index)=>(
        <SearchProductCard product={item} key={item.id} />
    ))
}
<CartSidebar />
</>

    )
};


