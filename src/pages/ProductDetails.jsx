import React, { useEffect, useState} from 'react'
import products from '../products.json'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

function ProductDetails({ cartItem, setCartItem }) {
    const [btnBG, setBtnBG] = useState('btn-outline-primary')
    const [btnText, setBtnText] = useState('ADD TO CART')

    let productID = useParams()

    productID = Number(productID.id)

    const product = products.find(product => product.id === productID)

    useEffect(() => {    
        if (cartItem.includes(product)) {
            setBtnBG('btn-secondary')
            setBtnText('REMOVE FROM CART')
        } else {
            setBtnBG('btn-outline-primary')
            setBtnText('ADD TO CART')
        }
    }, [cartItem, product])

    
    // Find Product
    if (product === undefined) {
        console.log('Product not found')
        return undefined
    }

    // console.log(product)

    // Return Stars
    const starsFill = (product) => {
        let star =[]
        for (let i = 0; i < Math.round(product.rating.rate); i++) {
            star.push(
                <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="hsl(30, 100%, 60%)" className="bi bi-star-fill me-1" viewBox="0 0 16 16">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                </svg>
            )
            
        }
        return star
    }

    const starsUnFill = (product) => {
        let star =[]
        for (let i = 0; i < (5 - Math.round(product.rating.rate)); i++) {
            star.push(
                <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="hsl(30, 100%, 60%)" className="bi bi-star me-1" viewBox="0 0 16 16">
                    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
                </svg>
            )
            
        }
        return star
    }

    // Return Products of the same category
    const sameCategory = products.filter(sameProduct => sameProduct.category === product.category)
    if (sameCategory === undefined) {
        console.log('Product not found')
        return sameCategory
    }

    // Add to Cart
    const addToCartFunc = (product) => {
        if (cartItem.includes(product)) {
            setCartItem(cartItem.filter(cart => cart.id !== product.id))
        } else {
            setCartItem([...cartItem, product])
        }
    }

    return (
        <div className='avoidNav container p-2'>
            
            <div className="row">
                <div className="col-4">
                    <img src={product.image} alt={product.title} className='img img-fluid w-100' />
                </div>
                <div className="col-8">
                    <h4 className='mt-1 mb-4'>{product.title}</h4>
                    
                    <p className='lead'>
                        <span className="fw-normal">{starsFill(product)}{starsUnFill(product)}</span>    
                        <span className='d-block mt-1'>{product.rating.count} Verified Rating</span>
                    </p>
                    <p className="lead">Category: <span className=' ms-1 text-capitalize fw-normal'>{product.category}</span></p>
                    <p className="lead mt-4">Price: <span className='ms-2 fw-bold'>${product.price}</span></p>

                    <button className={`btn ${btnBG} btn-lg w-100 mt-5 d-flex align-items-center justify-content-center`} onClick={() => addToCartFunc(product)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-cart-plus me-2" viewBox="0 0 16 16">
                            <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z"/>
                            <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                        </svg>
                        {btnText}
                    </button>
                </div>
            </div>

            <br />
            {/* Product Details */}
            <div className="mt-5">
                <h3>Product Details</h3>
                <hr />
                <h4 className='mt-4 mb-3'>{product.title}</h4>
                <p className="lead">Category: <span className=' ms-1 text-capitalize fw-normal'>{product.category}</span></p>
                <p className="lead">Price: <span className='ms-2 fw-bold'>${product.price}</span></p>
                <p className="lead">Rating:
                    <span className="fw-normal ms-2">{starsFill(product)}{starsUnFill(product)}</span>    
                    <span className='ms-2'>(From {product.rating.count} Verified Rating)</span>
                </p>
                <p className="lead">Description:
                    <span className="fw-normal ms-2 lh-lg">{product.description}</span>    
                </p>

                <div className='mt-5 text-center'>
                    <img src={product.image} className='img img-fluid' alt={product.title} />
                </div>

            </div>

            <div className="mt-5">
                <h3>You may also like</h3>
                <div className='w-100 position-relative overflow-x-hidden'>
                    <div className='justify-content-between positon-absolute' id='thubnailRow'>
                        {sameCategory.map(product => (
                            <div key={product.id} className='p-2 mx-2 border rounded' style={{width: '220px'}}>
                                <div className='px-5 py-2 w-100'>
                                    <Link to={`/product-detail/${product.id}`}>
                                        <img src={product.image} className='img card-img thubnail' id='product-image' alt={product.title} />
                                    </Link>
                                </div>
                                <p className="lead fs-6 mb-1 text-truncate">{product.title}</p>
                                <p className='fw-bold m-0'>${product.price}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails
