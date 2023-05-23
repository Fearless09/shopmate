import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Category from '../components/Category'
import Sortsearch from '../components/Sortsearch'

function Shop({ products, cartItem, setCartItem }) {

    const [cat, setCat] = useState('Shop')

    const addToCartFunc = (product) => {
        if (cartItem.includes(product)) {
            const index = cartItem.findIndex(cart => cart.id === product.id)
            if (index !== -1) {
                cartItem.splice(index, 1)
                setCartItem(Array.from(cartItem))
            }
            console.log("In Cart")
        } else {
            setCartItem([...cartItem, product])
        }
    }

    const shopProduct = products.sort((a,b) => {
        return a.id -b.id
    })

    useEffect(() => {
        if (cat == 'All') {
        setCat('Shop')
        }
    }, [cat])


    return (
        <div className='avoidNav'>
            <Category products={products} cat={cat} setCat={setCat} />
            <hr />
            <Sortsearch products={products} cat={cat} setCat={setCat} />
            <hr />
            <div className='container'>
                <div className='row'>
                    {shopProduct.map(product => {
                        return (
                            <div key={product.id} className='col-sm-6 col-md-4 col-xxl-3 p-4 p-xl-5' id='product'>
                                <div className='p-4'>
                                    <Link to={`/product-detail/${product.id}`}>
                                        <img src={product.image} className='img card-img' id='product-image' alt={product.title} />
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
                        )
                    })}
                </div>    
            </div>
        </div>
    )
}

export default Shop
