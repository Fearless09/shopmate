import React from 'react'

function Cart() {
    return (
        <div className="modal fade" id="cartModal" tabIndex="-1" aria-labelledby="cartModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">

                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="cartModalLabel">Cart</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div className="modal-body">
                    ...
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary">
                            Check Out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart
