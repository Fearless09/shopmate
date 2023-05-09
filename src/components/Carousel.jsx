import React, { useEffect, useState } from 'react'

function Carousel({products}) {

    // const [showCase, setShowCase] = useState()
    const showCase = []
    const slide = 3

    const randomNo = (num) => {
        return Math.floor(Math.random() * num)
    }

    // console.log(products)
    for (let i = 0; i < slide; i++) {
        showCase.push(products[randomNo(20)])
    }




    // showCase.map(products => {
    //     console.log(products.title)
    // })

  return (
    <React.Fragment>
        <div id="carousel" className="carousel slide mx-auto">
        <div className="carousel-inner">
            {/* Carousel Item */}
            
            {showCase.map((product, index) => {
                return (                        
                    <div key={index} className="carousel-item active">
                        <img src={product.image} className='img img-fluid w-100 position-absolute top-0 left-0 z-n1' id='carousel-img' alt="" />
                        <div className="container d-flex align-items-center h-100">
                            <div className="w-50 ms-5 ps-3" id='carousel-product'>
                                <h1>{product.title}</h1>

                                <a href="#" className="btn btn-lg text-light fs-4 px-0 py-1" id='view-product'>
                                    view product
                                    <span className="d-block mt-1" id='product-line'></span>
                                </a>
                                
                            </div>
                            
                        </div>
                    </div>
                )
            })}
        </div>

            <button className="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev">
                <span className="carousel-control-prev-icon p-2" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    </React.Fragment>
  )
}

export default Carousel
