import React from 'react';
import './App.css';
import Navbar from './components/Navbar'
import Homepage from './pages/Homepage';
import Db from './db.json'
import Footer from './components/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Shop from './pages/Shop';
import AboutUs from './pages/AboutUs';
import FAQ from './pages/FAQ';

function App() {

  //   fetch('https://fakestoreapi.com/products')
  //     .then(res => res.json())
  //     .then(data => {
  //       setProducts(data)
  //     })
  //     .catch(error => console.log(error))

  let products = Db

  console.log(Math.round(4.4))

  return (
    <>  
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage products={products} />} />
          <Route path='shop' element={<Shop products={products} />} />
          <Route path='about' element={<AboutUs />} />
          <Route path='faq' element={<FAQ />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
