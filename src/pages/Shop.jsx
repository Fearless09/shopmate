import React from 'react'
import { Link } from 'react-router-dom'
import Category from '../components/Category'
import Sortsearch from '../components/Sortsearch'

function Shop({products}) {
    // Loop throuh product to get star
    const addToCartFunc = (e, productID) => {
        e.target.parentElement.classList.toggle('red')
        // console.log(productID)
    }

    return (
        <div className='container mt-2 avoidNav'>
            
            <Category products={products} />
            <hr />
            <Sortsearch />
            <hr />
            <div className='row'>
                {products.map(product => {
                    return (
                        <div key={product.id} className='col-sm-6 col-md-4 col-xxl-3 p-4 p-xl-5' id='product'>
                            <div className='p-4'>
                                <a href={`product-detail/${product.id}`}>
                                    <img src={product.image} className='img card-img' id='product-image' alt="product" />
                                </a>
                            </div>
                            <p className="lead mb-1">{product.title}</p>
                            <div className="d-flex align-items-center justify-content-between">
                                <p className='fw-bold m-0'>${product.price}</p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="bi bi-heart-fill" fill={`hsl(0, 0%, 0%, 25%)`} viewBox="0 0 16 16">
                                    <path fillRule="evenodd" onClick={(e) => addToCartFunc(e, product.id)} d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                                </svg>
                            </div>
                        </div>
                    )
                })}
            </div>
            

        </div>
    )
}

export default Shop
