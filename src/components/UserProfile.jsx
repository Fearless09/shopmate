import React from 'react'
import GLogout from './GoogleLogout'

function UserProfile({ user, setUser }) {
    return (
        <div className="modal fade" id="profileModal" tabIndex="-1" aria-labelledby="profileModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">

                    <div className="modal-header">
                        <h1 className="modal-title fs-5 text-center" id="profileModalLabel">User Profile</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    {user === undefined ? '' : (
                        <div className="modal-body">
                            <p className="lead fw-normal text-center">
                                shopmate Welcome to your user profile page
                            </p>

                            <h5 className='mt-4'>Profile Information</h5>

                            <img src={user.imageUrl} className=' mt-1 img img-thumbnail border-0' alt="" />

                            <p className="lead my-2">
                                Name:
                                <span className="fw-normal ms-2">{user.name}</span>
                            </p>
                            <p className="lead">
                                E-Mail:
                                <span className="fw-normal ms-2">{user.email}</span>
                            </p>
                            
                        </div>
                    )}

                    

                    <div className="px-3 mb-4">
                        <GLogout setUser={setUser} />
                    </div>
                </div>
            </div>
        </div>

    )
}

export default UserProfile
