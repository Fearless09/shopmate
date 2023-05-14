import React from 'react'
import Carousel from '../components/Carousel'
import Sortsearch from '../components/Sortsearch'
import TopProduct from '../components/TopProduct'
import Category from '../components/Category'
import About from '../components/About'

function Homepage({products}) {

  return (
    <React.Fragment>
      <div className="avoidNav"></div>
        {/* Carousel */}
        <Carousel products={products} />
        <Category products={products} />
        <hr />
        <Sortsearch />
        <hr />
        <TopProduct products={products} />        <About />
    </React.Fragment>
  )
}

export default Homepage
