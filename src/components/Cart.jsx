import React from 'react'
import { useEffect } from 'react'

function Cart({ cartItem, setCartItem }) {

    const delCart = (product) => {
        setCartItem(cartItem.filter(cart => cart.id !== product.id))
    }

    let totalPrice = cartItem.reduce((sum, item) => {
        return sum + item.price
    }, 0)

    const checkout = async () => {
        await fetch('http://localhost:4000/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({items: cartItem})
        }).then(response => response.json())
        .then(response => {
            if (response.url) {
                window.location.assign(response.url)
                // console.log(response)
            }
        })
    }

    let cartContent = cartItem.map((item, index) => (
            <div className='row align-items-center my-2' key={index}>
                <div className="col-3">
                    <img src={item.image} className='img img-fluid w-100' alt={cartItem.title} />
                </div>
                <div className="col-9 px-3">
                    <h6 className='mb-2'>{item.title}</h6>
                    <p className='mb-1 text-capitalize'>{item.category}</p>
                    <div className="d-flex justify-content-between align-items-center">
                    <p className='fw-semibold m-0'>${item.price}</p>
                    <button className="btn btn-sm" onClick={() => delCart(item)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="hsl(0, 0%, 0%, 50%)" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                        </svg>
                    </button>
                    
                    </div>
                </div>
            </div>
    ))
    
    return (
        <div className="modal fade" id="cartModal" tabIndex="-1" aria-labelledby="cartModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">

                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="cartModalLabel">Cart</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    {cartItem.length === 0 ?
                        <div className='px-2 py-5 text-center'>
                            You've no item in your cart
                        </div>
                    :
                        <>
                            <div className="modal-body">                        
                                {cartContent}

                                <p className="lead d-flex justify-content-between align-items-center mt-3 mb-0 px-2">
                                    <span className='fw-semibold'>Total Price:</span>
                                    <span className='fw-bold'>${totalPrice}</span>
                                </p>
                            </div>

                            <div className="modal-footer pt-0">
                                <button type="button" className="btn btn-primary w-100 fw-bold text-uppercase" onClick={checkout}>
                                    Check Out
                                </button>
                            </div>
                        </>
                    }

                    
                </div>
            </div>
        </div>
    )
}

export default Cart
