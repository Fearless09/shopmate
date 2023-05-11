import React, { useState } from 'react'

function Navbar() {

  const [menu, setMenu] = useState(false)

  const showMenu = menu ? 'menu-visible' : 'menu-hidden'

  return (
    <>
      <nav className="navbar navbar-expand-md bg-body-tertiary position-fixed z-2 top-0 left-0 w-100">
        <div className="container position-relative py-3">

          {/* Menu btn */}
          <button className="navbar-toggler fs-6" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" onClick={() => setMenu(!menu)}>
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Menu displayed on md screen */}
          <div className={`collapse navbar-collapse px-4 px-md-0 d-none d-md-block md-menu`} id="navbarSupportedContent">
            <ul className="navbar-nav mb-2 mb-md-0">
              <li className="nav-item">
                <a className="nav-link fw-semibold fw-md-normal" href='shop'>Shop</a>
              </li>
              <li className="nav-item">
                <a className="nav-link fw-semibold fw-md-normal" href="about">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link fw-semibold fw-md-normal" href="faq">FAQ</a>
              </li>
            </ul>
          </div>

          {/* Brand Name */}
          <div className='mx-auto'> 
          <a className="navbar-brand text-black fw-semibold text-uppercase d-flex align-items-center" href='/'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-shop me-3" viewBox="0 0 16 16">
              <path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.371 2.371 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0zM1.5 8.5A.5.5 0 0 1 2 9v6h1v-5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v5h6V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5zM4 15h3v-5H4v5zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3zm3 0h-2v3h2v-3z"/>
            </svg>  
            shopmate
          </a>
          </div>

          {/* Cart and User */}
          <div className=''>
          <button data-bs-toggle="modal" data-bs-target="#exampleModal" className='btn btn-sm fs-6 text-muted'>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-cart3" viewBox="0 0 16 16">
              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
            </svg>
          </button>

          <a href="/" className='btn btn-sm fs-6 text-muted'>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
            </svg>  
          </a>
          </div>
          

          
        </div>

        {/* Menu displayed on sm screen */}
        <div className={`${showMenu} container d-block d-md-none mt-2`}>
          <div className={`collapse navbar-collapse`} id="navbarSupportedContent">
            <ul className="navbar-nav mb-2 mb-md-0 flex-row justify-content-center">
              <li className="nav-item">
                <a className="nav-link fw-semibold px-2" aria-current="page" href="shop">Shop</a>
              </li>
              <li className="nav-item">
                <a className="nav-link fw-semibold px-2" href="about">About Us</a>
              </li>
              <li className="nav-item">
                <a className="nav-link fw-semibold px-2" href="faq">FAQ</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Modal */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Cart</h1>
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

    </>
  )
}

export default Navbar;