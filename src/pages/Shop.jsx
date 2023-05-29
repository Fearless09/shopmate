import React, { useState, useEffect } from 'react'
import products from '../products.json'
import Category from '../components/Category'
import Sortsearch from '../components/Sortsearch'
import Product from '../components/Product'

function Shop({ cartItem, setCartItem }) {

    const [cat, setCat] = useState('Shop')

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
                    {products === undefined ? 
                        <p className='lead text-center'>Loading products . . .</p>
                    : <Product products={products} cartItem={cartItem} setCartItem={setCartItem} />
                    }
                </div>    
            </div>
        </div>
    )
}

export default Shop
