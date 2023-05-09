import React from 'react'
import Carousel from '../components/Carousel'
import Sortsearch from '../components/Sortsearch'
import TopProduct from '../components/TopProduct'
import AboutUs from '../components/AboutUs'
import Category from '../components/Category'

function Homepage({products}) {
  return (
    <React.Fragment>
        {/* Carousel */}
        <Carousel products={products} />
        <Category products={products} />
        <Sortsearch />
        <TopProduct products={products} />
        <AboutUs />
        
    </React.Fragment>
  )
}

export default Homepage
