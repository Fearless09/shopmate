import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import FilteredProduct from '../components/FilteredProduct'
import Category from '../components/Category'
import Sortsearch from '../components/Sortsearch'
import About from '../components/About'

function Filtered({ products, cartItem, setCartItem }) {

    let productCategory = useParams().category

    const [cat, setCat] = useState(productCategory)

    // Return Products of the same category
    let sameCategory = products.filter(sameProduct => sameProduct.category === productCategory)

    sameCategory = sameCategory.sort((a,b) => {
        return a.id - b.id
    })

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
                <FilteredProduct sameCategory={sameCategory} cartItem={cartItem} setCartItem={setCartItem} />
                <About />
            </div>
        </div>
    )
}

export default Filtered
