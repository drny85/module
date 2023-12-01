'use client'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const links: { label: string; path: string }[] = [
   { path: '/', label: 'Home' },
   { path: '/properties', label: 'Properties' },
   { path: '/referrals', label: 'Referrals' },
]
const NavBarLinks = () => {
   const path = usePathname()
   function containsPartOfWord(input: string, part: string): boolean {
      // Convert both the input and the part to lowercase for case-insensitive matching
      const lowercasedInput = input.toLowerCase()
      const lowercasedPart = part.toLowerCase()
      // Check if the lowercased input contains the lowercased part
      return lowercasedInput.includes(lowercasedPart)
   }

   return (
      <div className='flex items-center space-x-6 lg:space-x-8'>
         {links.map((link, index) => (
            <Link
               key={index}
               href={link.path}
               className={cn({
                  'hover:scale-105 hover:text-muted-foreground hover:border-b-2 border-secondary':
                     true,

                  'border-b-2 border-secondary':
                     containsPartOfWord(path, link.path) && link.path !== '/',
               })}
            >
               {link.label}
            </Link>
         ))}
      </div>
   )
}

export default NavBarLinks
