import React from 'react'
import { useParams } from 'react-router-dom'

function ProductDetails({products}) {
    let productID = useParams()

    productID = Number(productID.id)

    // Find Product
    const product = products.find(product => product.id === productID)
    if (product === undefined) {
        console.log('Product not found')
        return undefined
    }

    const sameCategory = products.filter(sameProduct => sameProduct.category === product.category)
    if (sameCategory === undefined) {
        console.log('Product not found')
        return sameCategory
    }

    console.log(sameCategory)
    
    // console.log(product.category)

    return (
        <div className='avoidNav container p-2'>
            <div className="row gutter-3">
                <div className="col-4">
                    <img src={product.image} alt="" className='img img-fluid w-100' />
                </div>
                <div className="col-8">
                    <h4 className='mt-1 mb-4'>{product.title}</h4>
                    <p className='lead'>
                        <span className="fw-normal">{product.rating.rate} stars</span>    
                        <span className='ms-2'>(From {product.rating.count} Verified Rating)</span>
                    </p>
                    <p className="lead">Category: <span className=' ms-1 text-capitalize fw-normal'>{product.category}</span></p>
                    <p className="lead mt-4">Price: <span className='ms-2 fw-normal'>${product.price}</span></p>

                    <button className="btn btn-outline-primary btn-lg w-100 mt-5">
                        ADD TO CART
                    </button>
                </div>
            </div>

            <br />

            <div className="mt-5">
                <h3>Product Details</h3>
                <hr />
                <h4 className='mt-4 mb-3'>{product.title}</h4>
                <p className="lead">Category: <span className=' ms-1 text-capitalize fw-normal'>{product.category}</span></p>
                <p className="lead">Price: <span className='ms-2 fw-normal'>${product.price}</span></p>
                <p className="lead">Rating:
                    <span className="fw-normal ms-2">{product.rating.rate} stars</span>    
                    <span className='ms-2'>(From {product.rating.count} Verified Rating)</span>
                </p>
                <p className="lead">Description:
                    <span className="fw-normal ms-2 lh-lg">{product.description}</span>    
                </p>

                <div className='mt-5 text-center'>
                    <img src={product.image} className='img img-fluid' alt="" />
                </div>

            </div>

            <div className="mt-5">
                <h3>You may also like</h3>
                <div className='row' id='thubnailRow'>
                    {sameCategory.map(product => {
                        return (
                            <div key={product.id} className='col-sm-6 col-md-4 col-xxl-3 p-2 thubnailCon'>
                                <div className='px-5 py-2'>
                                    <a href={`/product-detail/${product.id}`}>
                                        <img src={product.image} className='img card-img thubnail' id='product-image' alt="product" />
                                    </a>
                                </div>
                                <p className="lead fs-6 mb-1 text-truncate">{product.title}</p>
                                <p className='fw-bold m-0'>${product.price}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default ProductDetails
