import type { Metadata } from 'next'

import './globals.css'
import { Montserrat } from 'next/font/google'
import Provider from '@/providers/SessionProvider'
import NextUiProvider from '@/providers/NextUiProvider'
import { Toaster } from 'react-hot-toast'
import FirebaseProvider from '@/providers/FirebaseProvider'
import NavBar from '@/components/NavBar'

const inter = Montserrat({
   subsets: ['latin'],
   weight: ['400', '700', '500', '900'],
})

export const metadata: Metadata = {
   title: 'My Module',
   description: 'Generated by create next app',
}

export default function RootLayout({
   children,
}: {
   children: React.ReactNode
}) {
   return (
      <html lang='en'>
         <body className={inter.className}>
            <Provider>
               <FirebaseProvider>
                  <NextUiProvider>
                     <main className='max-w-7xl mx-auto min-h-screen px-4'>
                        <NavBar />
                        {children}
                        <Toaster />
                     </main>
                  </NextUiProvider>
               </FirebaseProvider>
            </Provider>
         </body>
      </html>
   )
}
