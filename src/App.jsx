import React from 'react';
import './App.css';
import Db from './db.json'
// import { getProducts } from './ProductAPI';
import Homepage from './pages/Homepage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Shop from './pages/Shop';
import AboutUs from './pages/AboutUs';
import FAQ from './pages/FAQ';
import ProductDetails from './pages/ProductDetails';
import PolicynToS from './pages/PolicynToS';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

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
      <Router>
        <Navbar />
        <Routes>
          <Route index element={<Homepage products={products} />} />
          <Route path='shopmate/shop' element={<Shop products={products} />} />
          <Route path='shopmate/about' element={<AboutUs />} />
          <Route path='shopmate/faq' element={<FAQ />} />
          <Route path='shopmate/product-detail/:id' element={<ProductDetails products={products} />} />
          <Route path='shopmate/ToS' element={<PolicynToS />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
