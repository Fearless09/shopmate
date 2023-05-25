import React, { useEffect, useState } from 'react';
import Db from './db.json'
// import { getProducts } from './ProductAPI';
import Homepage from './pages/Homepage';
import { HashRouter as Router, Routes, Route, json } from 'react-router-dom';
import ScrollToTop from './ScollToTop';
import Shop from './pages/Shop';
import Filtered from './pages/Filtered';
import AboutUs from './pages/AboutUs';
import FAQ from './pages/FAQ';
import ProductDetails from './pages/ProductDetails';
import PolicynToS from './pages/PolicynToS';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ContactBTN from './components/ContactBTN';

function App() {
  
  // let products = Db

  const [products, ] = useState(Db)
  
  const [cartItem, setCartItem] = useState([])

  // Load Cart from LocalStorage on Initial Render
  useEffect(() => {
    const storedData = localStorage.getItem('CartItem')
    if (storedData) {
      setCartItem(JSON.parse(storedData))
    }
  }, [])

  // Store cart Item into Local Storage
  useEffect(() => {
    // localStorage.setItem('CartItem', JSON.stringify(cartItem))
    
    const handleUnload = () => {
      localStorage.setItem('CartItem', JSON.stringify(cartItem))
    }
    
    window.addEventListener('beforeunload', handleUnload)
    
    return () => {
      window.removeEventListener('beforeunload', handleUnload)
    }

  }, [cartItem])
  
  
  // const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const data = await getProducts();
  //     setProducts(data);
  //   };
  //   fetchProducts();
  // }, []);

  return (
    <>     
      <Router>
        <Navbar
          cartItem={cartItem}
          setCartItem={setCartItem}
        />

        <ScrollToTop />

        <Routes>
          <Route
            index
            element={
              <Homepage
                products={products}
                cartItem={cartItem}
                setCartItem={setCartItem}
              />
            }
          />

          <Route
            path='/shop'
            element={
              <Shop
                products={products}
                cartItem={cartItem}
                setCartItem={setCartItem}
              />
            }
          />

          <Route
            path='/category/:category'
            element={
              <Filtered
                products={products}
                cartItem={cartItem}
                setCartItem={setCartItem}
              />
            }
          />

          <Route
            path='/about'
            element={
              <AboutUs />
            }
          />

          <Route
            path='/faq'
            element={
              <FAQ />
            }
          />

          <Route
            path='/product-detail/:id'
            element={
              <ProductDetails
                products={products}
                cartItem={cartItem}
                setCartItem={setCartItem}
              />
            }
          />

          <Route
            path='/ToS'
            element={
              <PolicynToS />
            }
          />

        </Routes>

        <ContactBTN />

        <Footer />

      </Router>
    </>
  );
}

export default App;
