'use server'
import { activitiesCollection, propertiesCollection } from '@/collections'
import { authOptions } from '@/providers/authOptions'
import { Activity, Property } from '@/types'
import { addDoc, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { User, getServerSession } from 'next-auth'

export const getUser = async (): Promise<User | null> => {
   try {
      const session = await getServerSession(authOptions)
      if (session) return session.user
      return null
   } catch (error) {
      console.log('Error getting user')
      return null
   }
}

export const addAllProperties = async (
   properties: Property[]
): Promise<boolean> => {
   if (!properties || properties.length === 0) return false
   const user = await getUser()

   if (!user) return false

   const cleanedArray: { [key: string]: any }[] = []
   const originalArray = [...properties]
   originalArray.forEach((originalObject) => {
      const cleanedObject: { [key: string]: any } = {}
      //remove any / from the object
      for (const key in originalObject) {
         if (originalObject.hasOwnProperty(key)) {
            const cleanedKey = key.replace(/\//g, '')
            //@ts-ignore
            cleanedObject[cleanedKey] = originalObject[key]
         }
      }
      console.log('cleanedObject', cleanedObject)

      cleanedArray.push(cleanedObject)
   })

   try {
      const promises = cleanedArray.map(async (data) => {
         const docRef = doc(
            propertiesCollection(user.id),
            data['MDU PROP ID'].toString()
         )
         const updated = { ...data, priority: 'MEDIUM' }
         console.log('Updated', updated)
         await setDoc(docRef, updated)
      })

      await Promise.all(promises)

      return true
   } catch (error) {
      console.error('Error adding documents in batch: ', error)
      return false
   }
}

export const updateProperty = async (property: Property): Promise<boolean> => {
   try {
      const user = await getUser()
      if (!user) return false
      if (!property) return false
      const docRef = doc(
         propertiesCollection(user.id),
         property['MDU PROP ID'].toString()
      )
      const p = await getDoc(docRef)
      if (!p.exists()) return false

      await updateDoc(docRef, property)
      return true
   } catch (error) {
      console.log(error)
      return false
   }
}

export const addActivity = async (
   propertyId: string,
   activity: Activity
): Promise<boolean> => {
   try {
      const user = await getUser()
      if (!user) return false
      const docRef = doc(activitiesCollection(propertyId))

      await setDoc(docRef, activity)
      return true
   } catch (error) {
      console.log('Error adding activity', error)
      return false
   }
}
