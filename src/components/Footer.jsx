import React from 'react'

function Footer() {
  return (
    <footer className='bg-body-tertiary mt-5 pt-5 pb-3'>
        <div className="container">
            <div className='text-center'>
                <p className="lead fw-semibold fs-4 mb-0">shopmate</p>
                <p className="lead">Shop Smart, Shop Shopmate</p>
            </div>
            <div className="row mt-5">
                {/* Contact Us */}
                <div className="col-sm-6 col-lg-3 px-3">
                    <p className="lead fw-semibold">Contact Us</p>
                    <span className="lead">Email: <a href='mailto:support@shopmate.com' className='text-secondary'>support@shopmate.com</a></span>
                    <p className="lead my-2 d-flex"><strong>Phone:</strong><span className='ms-2'>+234-701-234-5678</span></p>
                </div>
                {/* Payment and Shipping */}
                <div className="col-sm-6 col-lg-3 px-3 mt-4 mt-sm-0">
                    <p className="lead fw-semibold">Payment and Shipping</p>
                    <p className="lead">We accept major credit cards and PayPal. Shipping is free on all orders over $50.</p>
                </div>
                {/* Policy and ToS */}
                <div className="col-sm-6 col-lg-3 px-3 mt-4 mt-lg-0">
                    <p className="lead fw-semibold">Privacy Policy and ToS</p>
                    <p className="lead">To read our privacy policy and terms of service ToA, <a href="/ToS" className='btn px-0 text-decoration-underline'>click here</a></p>
                </div>
                {/* FAQ */}
                <div className="col-sm-6 col-lg-3 px-3 mt-4 mt-lg-0">
                    <p className="lead fw-semibold">FAQ</p>
                    <p className="lead">To read our frequently asked question, <a href="/faq" className='btn px-0 text-decoration-underline'>click here</a></p>
                </div>
            </div>
            <p className="lead fw-semibold text-center mt-4">
                Copyright 
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-c-circle mx-1" viewBox="0 0 16 16">
                    <path d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8Zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0ZM8.146 4.992c-1.212 0-1.927.92-1.927 2.502v1.06c0 1.571.703 2.462 1.927 2.462.979 0 1.641-.586 1.729-1.418h1.295v.093c-.1 1.448-1.354 2.467-3.03 2.467-2.091 0-3.269-1.336-3.269-3.603V7.482c0-2.261 1.201-3.638 3.27-3.638 1.681 0 2.935 1.054 3.029 2.572v.088H9.875c-.088-.879-.768-1.512-1.729-1.512Z"/>
                </svg>
                 2023 shopmate. All rights reseverd
            </p>
        </div>
    </footer>
  )
}

export default Footer
