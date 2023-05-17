import React from 'react'
import GLogin from './GoogleLogin'
import { gapi } from 'gapi-script'
import { useEffect, useState } from 'react'

const clientId = "381854485719-jevi42rcpla486c4brom1v1s2s0dafqn.apps.googleusercontent.com"


function LoginRgister({ onSuccess, onFailure}) {

    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId: clientId,
                scope: ""
            })
        }
        // if (user === undefined) {
        //     console.log("USER []")
        // }
        gapi.load('client: auth2', start)
    })


    return (
        <div className="modal fade" id="loginModal" tabIndex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">

                    <div className="modal-header">
                        <h1 className="modal-title fs-5 text-center" id="loginModalLabel">Welcome</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div className="modal-body">
                        <div className="text-center py-3">
                            <p className="lead fw-normal">Log In with</p>
                            <GLogin onSuccess={onSuccess} onFailure={onFailure} />
                        </div>
                        
                    </div>

                    {/* <div className="modal-footer">
                        <button type="button" className="btn btn-secondary">
                            Login
                        </button>
                    </div> */}
                </div>
            </div>
        </div>

        // Client ID: 381854485719-jevi42rcpla486c4brom1v1s2s0dafqn.apps.googleusercontent.com
        // Client Secret: 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
    )
}

export default LoginRgister
