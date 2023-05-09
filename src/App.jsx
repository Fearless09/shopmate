import React, { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar'
import Homepage from './pages/Homepage';
import Db from './db.json'
import Footer from './components/Footer';

function App() {

  // const [products, setProducts] = useState([])

  // useEffect(() => {

  //   fetch('https://fakestoreapi.com/products')
  //     .then(res => res.json())
  //     .then(data => {
  //       setProducts(data)
  //     })
  //     .catch(error => console.log(error))
    
  // }, [])

  const products = Db

  return (
    <>
      <Navbar />
      <Homepage products={products} />
      <Footer />
    </>
  );
}

export default App;
