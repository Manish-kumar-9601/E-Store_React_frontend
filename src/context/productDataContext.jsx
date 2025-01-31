import { createContext, useEffect, useReducer } from "react";
import { useLocation } from "react-router-dom";

// Initial state
const initialState = {
    productData: [],
    searchResultProduct: []
};

// Create context
export const ProductDataContext = createContext();

// Reducer function
const productDataReducer = (state, action) =>
{
    switch (action.type)
    {
        case "STORE_PRODUCT_DATA": {

            return { ...state, productData: action.payload };
        }
        case "STORE_SEARCH_RESULT": {
            const searchedProduct = action.payload;
            return { ...state, searchResultProduct: searchedProduct };
        }
        default:
            return state;
    }
};

// Provider component
export const ProductDataProvider = ({ children }) =>
{
    const [state, dispatch] = useReducer(productDataReducer, initialState);   
  const URL ='https://api.escuelajs.co/api/v1/products';

    useEffect(() =>
    {
        const fetchData = async () => 
        {
            try 
            {
                const response = await fetch(URL, {
                    method: 'GET',mode: "cors", 
                    cache: "no-cache",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const res = await response.json();
                dispatch({
                    type: 'STORE_PRODUCT_DATA', payload:  res ,
                });
            } catch (error) 
            {
                console.error('Error fetching product data:', error);
            }
        };
        fetchData();
   
    }, []);
    return (
        <ProductDataContext.Provider value={{ state, dispatch }}>
            {children}
        </ProductDataContext.Provider>
    );
};
