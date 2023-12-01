'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { MdOutlineDarkMode } from 'react-icons/md'
import { CiLight } from 'react-icons/ci'
import { Button } from '@nextui-org/button'

export default function ThemeSwitcher() {
   const [mounted, setMounted] = useState(false)
   const { theme, setTheme } = useTheme()

   useEffect(() => {
      setMounted(true)
   }, [])

   if (!mounted) return null

   return (
      <div className='flex gap-4'>
         <Button
            isIconOnly
            variant='flat'
            onClick={() => {
               if (theme === 'dark') {
                  setTheme('light')
               } else {
                  setTheme('dark')
               }
            }}
         >
            {theme === 'dark' ? (
               <MdOutlineDarkMode size={24} />
            ) : (
               <CiLight size={24} />
            )}
         </Button>
      </div>
   )
}
