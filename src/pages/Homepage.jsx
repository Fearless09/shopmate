import React, { useEffect, useState } from 'react'
import Carousel from '../components/Carousel'
import Sortsearch from '../components/Sortsearch'
import TopProduct from '../components/TopProduct'
import Category from '../components/Category'
import About from '../components/About'

function Homepage({products, cartItem, setCartItem}) {

  const [cat, setCat] = useState('Home')

  useEffect(() => {
    if (cat === 'All') {
      setCat('Home')
    } else if (cat === 'Electronics') {
      const sameCategory = products.filter(sameProduct => sameProduct.category === 'elctronics')
    }
  }, [cat])

  return (
    <React.Fragment>
      <div className="avoidNav"></div>
        {/* Carousel */}
        <Carousel products={products} />
        <Category products={products} />
        <hr />
        <Sortsearch cat={cat} setCat={setCat} />
        <hr />
        <TopProduct products={products} cartItem={cartItem} setCartItem={setCartItem} />
        <About />
    </React.Fragment>
  )
}

export default Homepage
