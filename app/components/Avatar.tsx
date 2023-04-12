'use client';

import React from 'react'
import Image from 'next/image'

const Avatar = () => {
    return (
        <Image alt='Avatar' height='30' width='30' src={'/image/avatar1.png'} className='rounded-full ' />
    )
}

export default Avatar