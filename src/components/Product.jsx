import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

function Product({ products, cartItem, setCartItem }) {

    const addToCartFunc = (product) => {
        if (cartItem.includes(product)) {
            setCartItem(cartItem.filter(cart => cart.id !== product.id))
        } else {
            setCartItem([...cartItem, product])
        }
    }

    return (
        <>
            {products.map((product, index) => (
                <div key={product.id} className='col-sm-6 col-md-4 col-xxl-3 p-4 p-xl-5' id='product'>
                    <div className='p-4'>
                        <Link to={`/product-detail/${product.id}`}>
                            <img src={product.image} className='img card-img' id='product-image' alt={product.title}/>
                        </Link>
                    </div>
                    <p className="lead mb-1">{product.title}</p>
                    <div className="d-flex align-items-center justify-content-between">
                        <p className='fw-bold m-0'>${product.price}</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="bi bi-heart-fill" fill={cartItem.includes(product) ? 'red' : 'hsl(0, 0%, 0%, 25%)'} viewBox="0 0 16 16">
                            <path fillRule="evenodd" onClick={() => addToCartFunc(product)} d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                        </svg>
                    </div>
                </div>
            ))}
        </>
    )
}

export default Product
