import React from 'react'

type DotProp = {
    status: string
}
const Dot = ({status}: DotProp) => {
    const color = status === 'paid' ? '#33D69F' : status === 'pending' ? '#FF8F00' : '#DFE3FA'
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
            <circle cx="4" cy="4" r="4" fill={color} />
        </svg>
    )
}

export default Dot