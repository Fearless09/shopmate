import React, { useEffect, useState } from 'react'
import Product from './Product'


function TopProduct({products, cartItem, setCartItem}) {
    const [endIndex, setEndIndex] = useState(8)
    const [disableSeeMore, setDisableSeeMore] = useState(false)

    const ratedProduct = [...products].sort((a,b) => {
        return b.rating.rate - a.rating.rate
    })

    const productLength = products.length

    let topProducts = ratedProduct.slice(0, endIndex)

    // console.log(topProducts)

    const seeMore = () => {
        setEndIndex(endIndex + 4)
        // console.log(endIndex)
    }

    useEffect(() => {
        if (endIndex === productLength) {
            setEndIndex(productLength)
            setDisableSeeMore(!disableSeeMore)
        }
    }, [endIndex, productLength])
    
    return (
        <div className='container mt-3'>
            <div className='row'>
                {topProducts === undefined ? 
                    <p className='lead text-center'>Loading products . . .</p>
                : <Product products={topProducts} cartItem={cartItem} setCartItem={setCartItem} />
                }
            </div>
            <button className='btn btn-sm btn-secondary d-block fw-semibold text-uppercase ms-auto' disabled={disableSeeMore} onClick={() => seeMore()}>see more</button>
        </div>


    )
}

export default TopProduct
