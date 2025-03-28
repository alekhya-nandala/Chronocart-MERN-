
import React from 'react';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import ShopCategory from './pages/ShopCategory';
import Thop from './pages/Thop';
import Product from './pages/Product';
import Cart from './pages/Cart';
import LoginSignup from './pages/LoginSignup';
import Footer from './components/Footer/Footer';
import men_banner from './components/assets/meno_bsn.png'
import women_banner from './components/assets/women_banner.png'
import kid_banner from './components/assets/kid_banner.png'
import ShopContextProvider from './context/ShopContext';

function App() {
  return (
    <div>
      <ShopContextProvider>
      <BrowserRouter>

      <Navbar />
      <Routes>
        <Route path='/' element={<Thop/>}/>
        <Route path='/mens' element={<ShopCategory banner={men_banner} category="men"/>}/>
        <Route path='/women' element={<ShopCategory banner={women_banner}category="women"/>}/>
        <Route path='/kids' element={<ShopCategory banner={kid_banner} category="kids"/>}/> 
        <Route path="product" element={<Product/>}>
          <Route path=':productId' element={<Product/>}/>
        </Route> 
        <Route path='/cart' element= {<Cart/>}/>
        <Route path='/login' element= {<LoginSignup/>}/>      
      </Routes>
      <Footer/>
      </BrowserRouter>
      </ShopContextProvider>
      
    </div>
  );
}

export default App;

