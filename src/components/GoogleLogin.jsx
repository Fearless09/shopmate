import React from 'react'
import { GoogleLogin } from 'react-google-login'

const clientId = "381854485719-jevi42rcpla486c4brom1v1s2s0dafqn.apps.googleusercontent.com"

function GLogin({ onSuccess, onFailure}) {

    return (
        <div id='signInButton'>
            <GoogleLogin
                className='w-100 justify-content-center fs-5'
                clientId={clientId}
                buttonText='Log In with Google'
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
        </div>
    )
}

export default GLogin
