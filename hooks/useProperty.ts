'use client'
import { propertiesCollection } from '@/collections'
import { Property } from '@/types'
import { doc, onSnapshot } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

export const useProperty = (propertyId: string) => {
   const [loading, setLoading] = useState(true)
   const { data: session } = useSession()
   const [property, setProperty] = useState<Property | null>(null)

   useEffect(() => {
      if (!propertyId || !session) {
         setLoading(false)
         return
      }

      const propRef = doc(propertiesCollection(session.user.id), propertyId)

      const propSub = onSnapshot(propRef, (snap) => {
         if (!snap.exists()) return
         setProperty(snap.data())
         setLoading(false)
      })

      return propSub
   }, [propertyId, session])

   return { loading, property }
}
