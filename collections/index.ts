import { createCollection } from '@/firebase'
import { Activity, Property, Referral } from '@/types'

export const propertiesCollection = (userId: string) =>
   createCollection<Property>(`properties/${userId}/properties`)

export const activitiesCollection = (propertyId: string) =>
   createCollection<Activity>(`activities/${propertyId}/activities`)

export const referralsCollection = (userId: string) =>
   createCollection<Referral>(`vrrs/${userId}/vrrs`)
