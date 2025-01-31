import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './context/cartContext.jsx';
import { ClerkProvider } from '@clerk/clerk-react'
import { Auth0Provider } from '@auth0/auth0-react';
import { ProductDataProvider } from './context/productDataContext.jsx';
import { SellerProvider } from './context/sellerContext.jsx';
import { UserProvider } from './context/userContext.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
   <Auth0Provider
    domain={import.meta.env.VITE_OAUTH_DOMAIN}
    clientId={import.meta.env.VITE_OAUTH_CLIENT_ID}
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <UserProvider>
    <SellerProvider>
    <ProductDataProvider>
      <CartProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CartProvider>
    </ProductDataProvider>
    </SellerProvider>
    </UserProvider>
    </Auth0Provider>
  </StrictMode>
);
