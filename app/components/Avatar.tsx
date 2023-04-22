'use client';

import React from 'react'
import Image from 'next/image'
import { SafeUser } from '../types';

interface AvatarProps {
    src?: string | null
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {
    return (
        <Image alt='Avatar' height='30' width='30' src={src || '/image/avatar1.png'} className='rounded-full ' />
    )
}

export default Avatar