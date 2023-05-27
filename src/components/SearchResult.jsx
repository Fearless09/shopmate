import React from 'react'
import { Link } from 'react-router-dom'

function SearchResult({ products }) {
    return (
        <>
            {products.map(result => {
              return (
                <li key={result.id}><Link to={`/product-detail/${result.id}`} className="dropdown-item px-2" href="#">
                  <p className='text-truncate mb-1'>{result.title}</p>
                  <div className="hstack justify-content-between">
                    <p className='text-capitalize'>{result.category}</p>
                    <p className='fw-semibold'>${result.price}</p>
                  </div>
                  
                </Link></li>
              )
            })}
        </>
    )
}

export default SearchResult
