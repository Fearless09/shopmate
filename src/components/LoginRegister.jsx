import React from 'react'

function LoginRgister() {
    return (
        <div className="modal fade" id="loginModal" tabIndex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">

                    <div className="modal-header">
                        <h1 className="modal-title fs-5 text-center" id="loginModalLabel">Welcome</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div className="modal-body">
                    ...
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary">
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginRgister
