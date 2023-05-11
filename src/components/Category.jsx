import React from 'react'

function Category({products}) {

  

  return (
    <div className='text-center pt-4'>
      <h5>Category</h5>
      <div className="mx-auto cat-container">
        <div className="row mt-4">
          <div className="col-3">
            <img src={products[12].image} className='img w-50 mx-auto' id='category-thumbnail' alt="" />
            <p className="lead mt-2">Electronics</p>
          </div>
          
          <div className="col-3 ">
            <img src={products[2].image} className='img w-50 mx-auto' id='category-thumbnail' alt="" />
            <p className="lead mt-2">Men's Clothing</p>
          </div>

          <div className="col-3 ">
            <img src={products[18].image} className='img w-50 mx-auto' id='category-thumbnail' alt="" />
            <p className="lead mt-2">Women's Clothing</p>
          </div>

          <div className="col-3 ">
            <img src={products[6].image} className='img w-50 mx-auto' id='category-thumbnail' alt="" />
            <p className="lead mt-2">Jewelery</p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Category
