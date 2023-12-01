import { propertiesCollection } from '@/collections'
import { Property } from '@/types'
import { onSnapshot } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

export const useProperties = () => {
   const [loading, setLoading] = useState(true)
   const { data: session } = useSession()
   const [properties, setProperties] = useState<Property[]>([])

   useEffect(() => {
      if (!session) {
         setLoading(false)
         return
      }
      const sub = onSnapshot(propertiesCollection(session.user.id), (snap) => {
         setProperties(snap.docs.map((prop) => ({ ...prop.data() })))
         setLoading(false)
      })

      return sub
   }, [session])

   return { loading, properties }
}
