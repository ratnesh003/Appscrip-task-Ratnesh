"use client";

import Image from 'next/image'
import React from 'react'
import { brandLogo } from '../../public'
import { pages } from '@/constants'
import { useRouter } from 'next/navigation';

const NavBar = () => {

  const router = useRouter();
  
  return (
    <nav className='navContainer'>
      <div className='branding'>
        <Image src={brandLogo} height={30} width={30} alt='Brand Logo'/>
        <h1>LOGO</h1>
        <div className='features'>
          <span>&#x1F50D;</span>
          <span>&#9825;</span>
          <span>&#128717;</span>
          <span>&#x1F464;</span>
          <span> ENG &#x1F893;</span>
        </div>
      </div>
      <div className='tabs'>
        {pages.map((page) => (
          <span key={page.name} onClick={() => router.push(`/${page.name}`)}>{page.name}</span>
        ))}
      </div>
    </nav>
  )
}

export default NavBar