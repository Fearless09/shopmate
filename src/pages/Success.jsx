import React from 'react'

function Success({ cartItem, setCartItem }) {

    let orderDate = new Date()

    function generateOrderId() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numbers = '0123456789';
        let orderIdA = '';
        let orderIdN = ''
      
        // Generate the first four uppercase letters
        for (let i = 0; i < 2; i++) {
          orderIdA += characters.charAt(Math.floor(Math.random() * characters.length));
        }
      
        // Generate the remaining twelve numbers
        for (let i = 0; i < 10; i++) {
          orderIdN += numbers.charAt(Math.floor(Math.random() * numbers.length));
        }
      
        return `${orderIdA}-${orderIdN}`;
    }

    return (
        <div className="success pt-4">
            <div className='avoidNav container'>
                <h4 className='text-center pt-3'>Thank you for your purchase!</h4>
                <p className='lead mt-3'>
                    We are delighted to inform you that your payment was successfully processed. Your order has been confirmed and is being prepared for shipment.
                </p>
                <p className="lead mt-2">
                    We appreciate your business and look forward to delivering a fanstastic shopping expericence.
                </p>

                {/* Order Details */}
                <h5 className='mt-5 pt-3'>Order Details</h5>
                <hr />
                <p className="lead">Order ID:
                    <span className="ms-2 fw-normal">{generateOrderId()}</span>
                    {/* Math.floor(Math.random() * (10**16)) */}
                </p>
                <p className="lead">Order Date:
                    <span className="fw-normal ms-2">{orderDate.toString()}</span>
                </p>
                <p className="lead">Payment Method:
                    <span className='ms-2 fw-normal'>Stripe Payment Platform</span>
                </p>
                <div>
                    <p className="lead mb-2">Product Ordered</p>
                    <div className="ms-2 mb-3 px-3">
                        {cartItem.map(item => (
                            <div key={item.id} className='row my-3 border p-2 rounded align-items-center'>
                                <div className="col-4 col-md-2">
                                    <img src={item.image} className='img img-fluid w-100' alt="" />
                                </div>
                                <div className="col-8 col-md-6">
                                    <p className='mb-2'>{item.title}</p>
                                    <p className='text-capitalize fw-semibold mb-0'>{item.category}</p>
                                    <p className='text-capitalize fw-semibold mb-0'>${item.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <p className="lead">Total Amount:
                    <span className='ms-2 fw-normal'>${cartItem.reduce((sum, item) => (sum + item.price), 0)}</span>
                </p>
            </div>
        </div>
    )
}

export default Success
