import React, { useEffect, useState } from 'react'


function ContactBTN() {
    const [display, setDisplay] = useState(false)
    const [input, setInput] = useState()
    const [chat, setChat] = useState('Hi')
    const [AI, setAI] =useState('HI')

    let chatDisplay = display ? 'd-block' : 'd-none'

    const api = process.env.REACT_APP_API_KEY
    
    const handleRequest = () => {
        if (input === '') {

        } else {
            setChat(input)
            setInput('')
        }
    }

    window.addEventListener('click', () => {
        // if (display == true) {
        //     setDisplay(false)
        // }
    })

    // useEffect(() => console.log(chat))
    return (
        <div className="position-fixed end-0 bottom-0 mb-5 me-5 z-2">
            {/* Dropdown Menu */}
            <div className={`${chatDisplay} bg-white border-primary border border-1 rounded p-3`} style={{width: '450px', height: '350px'}}>
                <h5 className='text-center text-primary'>Chat with our AI Assistant</h5>
                <hr className='text-primary' />

                {/* Chat */}
                <div className='overflow-y-auto' style={{height: '225px'}}>
                    
                    {chat === undefined ? null : 
                        <div className='text-black py-1'>{chat} form USER</div>
                    }
                    {AI === undefined ? null : 
                        <div className='text-muted py-1 px-2 rounded bg-light'>{AI} form AI</div>
                    }
                </div>

                {/* Chat Input Group */}
                <div className="input-group input-group-sm mt-2">
                    {/* Chat Input */}
                    <input className="form-control border-end-0 border-primary" type="search" placeholder="Search by name . . ." value={input} id="example-search-input" onChange={e => setInput(e.target.value)} />
                    {/* Chat Button */}
                    <span className="input-group-append">
                    <button className="btn btn-sm btn-outline-primary border-start-0 border-botom-0 z-0" type="button" onClick={() => handleRequest()}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                        </svg>
                    </button>
                    </span>
                </div>
            </div>

            {/* Dropdown toggle Button */}
            <button className='btn btn-lg border-0 p-0 mt-2 float-end' type="button" onClick={() => setDisplay(!display)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="#0d6efd" className="bi bi-chat-dots" viewBox="0 0 16 16">
                    <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                    <path className='path-1' d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9.06 9.06 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.437 10.437 0 0 1-.524 2.318l-.003.011a10.722 10.722 0 0 1-.244.637c-.079.186.074.394.273.362a21.673 21.673 0 0 0 .693-.125zm.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6c0 3.193-3.004 6-7 6a8.06 8.06 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a10.97 10.97 0 0 0 .398-2z"/>
                </svg>
            </button>
        </div>
    )
}

export default ContactBTN
