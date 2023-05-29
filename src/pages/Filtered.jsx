import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import products from '../products.json'
import Category from '../components/Category'
import Sortsearch from '../components/Sortsearch'
import About from '../components/About'
import Product from '../components/Product'

function Filtered({ cartItem, setCartItem }) {

    let productCategory = useParams().category

    const [cat, setCat] = useState(productCategory)

    // Return Products of the same category
    let sameCategory = products.filter(sameProduct => sameProduct.category === productCategory)

    if (sameCategory === undefined) {
        console.log('Product not found')
        return sameCategory
    }

    return (
        <div className='avoidNav'>
            <Category products={products} cat={cat} setCat={setCat} />
            <hr />
            <Sortsearch products={products} cat={cat} setCat={setCat} />
            <hr />
            <div className='container'>
                <div className="row">
                    <Product products={sameCategory} cartItem={cartItem} setCartItem={setCartItem} />
                </div>
                <About />
            </div>
        </div>
    )
}

export default Filtered
