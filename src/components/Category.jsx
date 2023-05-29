import React, { useState } from 'react'
import products from '../products.json'
import { Link } from 'react-router-dom'

function Category({ setCat }) {
  
  products.sort((a,b) => {
    return a.id - b.id
  })

  return (
    <div className='text-center pt-4'>
      <h5>Category</h5>
      <div className="mx-auto cat-container">
        <div className="row mt-4 text-center">
          <div className="col-3">
            <Link to={`/category/electronics`} onClick={() => setCat('Electronics')}>
              <img src={products[12].image} className='img w-50 mx-auto' id='category-thumbnail' alt={products[12].title} />
            </Link>
            <p className="mt-2">Electronics</p>
          </div>
          
          <div className="col-3 ">
            <Link to={`/category/men's clothing`} onClick={() => setCat(`Men's Clothing`)}>
              <img src={products[2].image} className='img w-50 mx-auto' id='category-thumbnail' alt={products[2].title} />
            </Link>
            <p className="mt-2">Men's Clothing</p>
          </div>

          <div className="col-3 ">
            <Link to={`/category/women's clothing`} onClick={() => setCat(`Women's Clothing`)}>
              <img src={products[18].image} className='img w-50 mx-auto' id='category-thumbnail' alt={products[18].title} />
            </Link>
            <p className="mt-2">Women's Clothing</p>
          </div>

          <div className="col-3 ">
            <Link to={`/category/jewelery`} onClick={() => setCat(`Jewelery`)}>
              <img src={products[6].image} className='img w-50 mx-auto' id='category-thumbnail' alt={products[6].title} />
            </Link>
            <p className="mt-2">Jewelery</p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Category
