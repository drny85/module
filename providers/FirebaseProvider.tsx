'use client'
import { PropsWithChildren, useEffect } from 'react'

import { signInWithCustomToken, signOut } from 'firebase/auth'

import { auth } from '@/firebase'
import { Session } from 'next-auth'
import { useSession } from 'next-auth/react'

async function signInWith(session: Session) {
   if (session && session.firebaseToken) {
      try {
         await signInWithCustomToken(auth, session.firebaseToken)
      } catch (error) {
         console.log('error signin with custom token', error)
      }
   } else {
      signOut(auth)
   }
}

const FirebaseProvider = ({ children }: PropsWithChildren) => {
   const { data: session } = useSession()
   useEffect(() => {
      if (!session) return

      signInWith(session)
   }, [session])

   return <>{children}</>
}

export default FirebaseProvider
