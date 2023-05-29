import React, { useEffect, useState } from 'react'
import products from '../products.json'
import Carousel from '../components/Carousel'
import Sortsearch from '../components/Sortsearch'
import TopProduct from '../components/TopProduct'
import Category from '../components/Category'
import About from '../components/About'

function Homepage({cartItem, setCartItem}) {

  const [cat, setCat] = useState('Home')

  useEffect(() => {
    if (cat === 'All') {
      setCat('Home')
    }
  }, [cat])

  return (
    <React.Fragment>
      <div className="avoidNav"></div>
        {/* Carousel */}
        <Carousel products={products} />
        <Category products={products} cat={cat} setCat={setCat} />
        <hr />
        <Sortsearch products={products} cat={cat} setCat={setCat} />
        <hr />
        <TopProduct products={products} cartItem={cartItem} setCartItem={setCartItem} />
        <About />
    </React.Fragment>
  )
}

export default Homepage
