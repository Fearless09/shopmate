import React, { useEffect, useState } from 'react'

function Category({products}) {

  const [categoryImage, setCategoryImage] = useState()

  useEffect(() => {
    setCategoryImage(products)
    // console.log(categoryImage)
  }, [products])

  return (
    <div className='bg-body-tertiary text-center pt-4'>
      <h5>Category</h5>
      <div className="container">
        {products.lenght === 0 ? (
          <div>Loading</div>
        ): (
          <div className="row mt-4">
            <div className="col-3 px-5">
              <img src={products[12].image} className='img w-50 mx-auto' id='category-thumbnail' alt="" />
              <p className="lead mt-2">Electronics</p>
            </div>
            
            <div className="col-3 px-5">
              <img src={products[2].image} className='img w-50 mx-auto' id='category-thumbnail' alt="" />
              <p className="lead mt-2">Men's Clothing</p>
            </div>

            <div className="col-3 px-5">
              <img src={products[18].image} className='img w-50 mx-auto' id='category-thumbnail' alt="" />
              <p className="lead mt-2">Women's Clothing</p>
            </div>

            <div className="col-3 px-5">
              <img src={products[6].image} className='img w-50 mx-auto' id='category-thumbnail' alt="" />
              <p className="lead mt-2">Jewelery</p>
            </div>
          </div>

        )}
      </div>
    </div>
  )
}

export default Category
