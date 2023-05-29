import React from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'

// Impoert Swiper Style
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

// Import required module
import { Autoplay, Pagination, Navigation } from 'swiper'
import { Link } from 'react-router-dom'

function Carousel({ products }) {

    const showCase = []
    const slide = 3

    const randomNo = (num) => {
        return Math.floor(Math.random() * num)
    }
    
    for (let i = 0; i < slide; i++) {
        showCase.push(products[randomNo(20)])
    }

  return (
    <React.Fragment>
        <Swiper
            spaceBetween={30}
            centeredSlides={true}
            loop={true}
            autoplay={{
                delay: 4000,
                disableOnInteraction: false
            }}
            pagination={{
                clickable: true
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className='mySwiper mx-auto'
        >
            {/* Carousel Item */}
            {showCase.map((product, index) => (
                <SwiperSlide key={index} className='slide'>
                        <img src={product.image} className='img img-fluid w-100 position-absolute top-0 left-0 z-n1' id='carousel-img' alt={product.title} />
                        <div className="container d-flex align-items-center h-100">
                            <div className="w-75 ms-5 ps-3" id='carousel-product'>
                                <h1>{product.title}</h1>

                                <Link to={`/product-detail/${product.id}`} className="btn btn-lg text-light fs-4 px-0 mt-2" id='view-product'>
                                    view product
                                    <span className="d-block mt-1" id='product-line'></span>
                                </Link>
                                
                            </div>
                            
                        </div>
                </SwiperSlide>        
            ))}

        </Swiper>            
    </React.Fragment>
  )
}

export default Carousel
