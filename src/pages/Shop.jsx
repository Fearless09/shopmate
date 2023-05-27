import React, { useState, useEffect } from 'react'
import Category from '../components/Category'
import Sortsearch from '../components/Sortsearch'
import Product from '../components/Product'

function Shop({ products, cartItem, setCartItem }) {

    const [cat, setCat] = useState('Shop')

    const shopProduct = products.sort((a,b) => {
        return a.id -b.id
    })

    useEffect(() => {
        if (cat === 'All') {
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
                    {shopProduct === undefined ? 
                        <p className='lead text-center'>Loading products . . .</p>
                    : <Product products={shopProduct} cartItem={cartItem} setCartItem={setCartItem} />
                    }
                </div>    
            </div>
        </div>
    )
}

export default Shop
