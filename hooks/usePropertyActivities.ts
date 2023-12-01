'use client'
import { activitiesCollection } from '@/collections'
import { Activity } from '@/types'

import { onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'

export const usePropertyActivities = (propertyId: string) => {
   const [loading, setLoading] = useState(true)

   const [activities, setActivities] = useState<Activity[]>([])

   useEffect(() => {
      if (!propertyId) {
         setLoading(false)
         return
      }

      const actSub = onSnapshot(activitiesCollection(propertyId), (snap) => {
         setActivities(snap.docs.map((a) => ({ id: a.id, ...a.data() })))
      })
      setLoading(false)

      return actSub
   }, [propertyId])

   return { loading, activities }
}
