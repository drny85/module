'use client'
import React, { PropsWithChildren } from 'react'
import { NextUIProvider as Provider } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

const NextUiProvider = ({ children }: PropsWithChildren) => {
   const router = useRouter()
   return (
      <Provider navigate={router.push}>
         <NextThemesProvider attribute='class' defaultTheme='light'>
            {children}
         </NextThemesProvider>
      </Provider>
   )
}

export default NextUiProvider
