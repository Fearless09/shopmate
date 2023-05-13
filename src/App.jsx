import React from 'react';
import './App.css';
import Db from './db.json'
// import { getProducts } from './ProductAPI';
import Navbar from './components/Navbar'
import Homepage from './pages/Homepage';
import Footer from './components/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Shop from './pages/Shop';
import AboutUs from './pages/AboutUs';
import FAQ from './pages/FAQ';
import ProductDetails from './pages/ProductDetails';

function App() {

  let products = Db
  
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
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage products={products} />} />
          <Route path='shop' element={<Shop products={products} />} />
          <Route path='about' element={<AboutUs />} />
          <Route path='faq' element={<FAQ />} />
          <Route path='product-detail/:id' element={<ProductDetails products={products} />} />
          
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
