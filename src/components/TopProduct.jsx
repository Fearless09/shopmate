import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


function TopProduct({products}) {
    const [endIndex, setEndIndex] = useState(8)
    const [disableSeeMore, setDisableSeeMore] = useState(false)


    const addToCartFunc = (e, productID) => {
        e.target.parentElement.classList.toggle('red')
        // console.log(productID)
    }

    products.sort((a,b) => {
        return b.rating.rate - a.rating.rate
    })

    const productLength = products.length

    let topProducts = products.slice(0, endIndex)

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
    }, [endIndex])

    const productImage = (e, product) => {
        // console.log(product)
    }

    // let productd = 11
    

    return (
        <div className='container mt-3'>
            <div className='row'>
                {topProducts.map((product, index) => {
                    return (
                        <div key={product.id} className='col-sm-6 col-md-4 col-xxl-3 p-4 p-xl-5' id='product'>
                            <div className='p-4'>
                                <Link to={`/product-detail/${product.id}`}>
                                    <img src={product.image} className='img card-img' id='product-image' alt="product" onClick={(e) => productImage(e, product)} />
                                </Link>
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
            <button className='btn btn-sm btn-secondary d-block fw-semibold text-uppercase ms-auto' disabled={disableSeeMore} onClick={() => seeMore()}>see more</button>
        </div>


    )
}

export default TopProduct
