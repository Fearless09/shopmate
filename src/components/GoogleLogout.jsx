import React from 'react'
import { GoogleLogout } from 'react-google-login'

const clientId = "381854485719-jevi42rcpla486c4brom1v1s2s0dafqn.apps.googleusercontent.com"

function GLogout({ setUser }) {

    function onSuccess() {
        setUser()
        window.location.reload();
        console.log("Logout suceesfully")
    }

    return (
        <div id='signOutButton'>
            <GoogleLogout
                className='w-100 justify-content-center fs-5'
                clientId={clientId}
                buttonText={'Log Out'}
                onLogoutSuccess={onSuccess}
            />
        </div>
    )
}

export default GLogout
