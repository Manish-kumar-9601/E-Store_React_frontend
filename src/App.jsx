//Components
import Navbar from './components/Navbar.jsx';
import Bestseller from './Bestseller.jsx';
import { HomePage } from './HomePage.jsx';
import ClothInfo from './ClothInfo.jsx';
import ContactForm from './ContactForm.jsx';
import { Login } from './pages/login.jsx';
import { Footer } from './components/footer.jsx';
import { SignUp } from './pages/signUp.jsx';
//Libraries
import { Routes, Route } from 'react-router-dom';
import ErrorPage from './ErrorPage';
//Stylesheet
import './App.css';
import { AuthPage } from './pages/authPage.jsx';
import { SearchResultPage } from './pages/searchResultPage.jsx';
import { ShoppingPage } from './pages/shoppingPage.jsx';
import { AddProductForm } from './pages/addProductForm.jsx';
import { PlaceOrderPage } from './pages/placeOrderPage.jsx';
import { PaymentMethodPage } from './pages/paymentPage.jsx';
import { ShippingAddressPage } from './pages/shippingPage.jsx';
import { SellerLoginForm } from './pages/sellerLogin.jsx';
import { SellerRegisterForm } from './pages/sellerRegisterForm.jsx';
import CartPage from './pages/cartPage.jsx';
import { OrderPlaced } from './pages/OrderPlaced.jsx';
function App ()
{
  return (
    <>
      <Navbar /> 

      <Routes> 
        <Route exact index path="/" element={<HomePage />} /> 
        <Route path="/bestSeller" element={<Bestseller />} /> 
        <Route path="/clothInfo" element={<ClothInfo />} /> 
        <Route path="/clothInfo/:id" element={<ClothInfo />} /> 
        <Route path="/contactUs" element={<ContactForm />} /> 
        <Route path="/shop" element={<ShoppingPage/>} /> 
        <Route path="/authPage" element={<AuthPage />} /> 
        <Route path="/login" element={<Login />} /> 
        <Route path="/signUp" element={<SignUp />} /> 
        <Route path="/searchResult" element={<SearchResultPage />} /> 
        
        <Route path="/addProduct" element={<AddProductForm />} /> 
        
        <Route path="/cartPage" element={<CartPage />} /> 
        <Route path="/placeOrder" element={<PlaceOrderPage />} /> 
        <Route path="/payment" element={<PaymentMethodPage />} /> 
        <Route path="/shipping" element={<ShippingAddressPage />} /> 
        <Route path="/registerSeller" element={<SellerRegisterForm />} /> 
        <Route path="/loginSeller" element={<SellerLoginForm />} /> 
        <Route path="/orderPlaced" element={<OrderPlaced />} /> 
        <Route path="*" element={<ErrorPage />} /> </Routes>
      <Footer/> 
    </>
  );
}

export default App;
