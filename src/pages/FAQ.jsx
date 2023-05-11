import React from 'react'

function FAQ() {
    return (
        <div className='container avoidNav'>
            <br />
            <h4 className='py-2'>
                Frequently Asked Questions
            </h4>

            <div className='my-4'>
                <p className="lead mb-2 fw-semibold">
                    Q: How long will it take to receive my order?
                </p>
                <code className='fs-6'>
                    A: We offer fast and reliable shipping, and most orders are delivered within 3-5 business days. However, delivery times may vary depending on your location and the shipping method you choose.
                </code>
            </div>
            
            <div className='my-4'>
                <p className="lead mb-2 fw-semibold">
                    Q: What payment methods do you accept?
                </p>
                <code className='fs-6'>
                    A: We accept major credit cards and PayPal. All payments are processed securely through our payment gateway to ensure your information is protected.
                </code>
            </div>
            
            <div className='my-4'>
                <p className="lead mb-2 fw-semibold">
                    Q: Can I return an item if I'm not satisfied with it?
                </p>
                <code className='fs-6'>
                    A: Yes, we offer a 30-day return policy on most items. If you're not satisfied with your purchase, simply contact our customer service team to initiate the return process.
                </code>
            </div>

            <div className='my-4'>
                <p className="lead mb-2 fw-semibold">
                    Q: How can I track my order?
                </p>
                <code className='fs-6'>
                    A: Once your order has shipped, you will receive a confirmation email with a tracking number. You can use this number to track the progress of your delivery on our website.
                </code>
            </div>

            <div className='my-4'>
                <p className="lead mb-2 fw-semibold">
                    Q: Do you offer international shipping?
                </p>
                <code className='fs-6'>
                    A: Yes, we offer international shipping to select countries. Please check our shipping page for more information.
                </code>
            </div>

            <div className='my-4'>
                <p className="lead mb-2 fw-semibold">
                    Q: How can I contact customer service?
                </p>
                <code className='fs-6'>
                    A: You can contact our customer service team by email at support@shopmate.com or by phone at 1-800-123-4567. Our team is available to assist you Monday through Friday from 9am to 5pm EST.
                </code>
            </div>

            <p className="lead">If you have any other questions or concerns, please don't hesitate to reach out to our customer service team. We're here to help!</p>

        </div>
    )
}

export default FAQ
