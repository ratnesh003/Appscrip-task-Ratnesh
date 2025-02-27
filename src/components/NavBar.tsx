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
        <Image style={{cursor: 'pointer'}} src={brandLogo} height={30} width={30} alt='Brand Logo' onClick={() => router.push('/')}/>
        <h1>LOGO</h1>
        <div className='features'>
          <span key={1}>&#x1F50D;</span>
          <span key={2}>&#9825;</span>
          <span key={3}>&#128717;</span>
          <span key={4}>&#x1F464;</span>
          <span key={5}> ENG &#x1F893;</span>
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