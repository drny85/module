import { Referral, ReferralInfo } from '@/types'
import { getUser } from '../properties'
import { referralsCollection } from '@/collections'
import { doc, setDoc } from 'firebase/firestore'
import { formatPhone } from '@/utils/formatPhone'

function isPartOfStringInWord(word: string, part: string) {
   const regex = new RegExp(`.*${part}.*`, 'i') // 'i' flag for case-insensitive matching
   return regex.test(word)
}

export const addAllReferrals = async (
   referrals: Referral[]
): Promise<boolean> => {
   if (!referrals || referrals.length === 0) return false
   const user = await getUser()

   if (!user) return false

   const cleanedArray: ReferralInfo[] = []
   const originalArray = [...referrals]
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
      const d = cleanedObject as ReferralInfo
      console.log(d)

      cleanedArray.push(d)
   })

   try {
      const promises = cleanedArray
         .filter((r) => !r.Status.toLowerCase().includes('closed'))
         .map(async (data) => {
            const docRef = doc(
               referralsCollection(user.id),
               data['Referral Id']
            )
            console.log(data['UnitApt#'])
            const referral: Referral = {
               name: data.Resident,
               address: data['Resident Address'],
               email_sent: false,
               addedBy: user.id,
               comment: null,
               due_date: null,
               isReferral: true,
               date_entered: new Date().toISOString(),
               email_sent_on: null,
               manager: {
                  email: data['Client Executive Email'],
                  name: data['Client Executive Name'],
                  phone: data['Client Executive Phone'],
                  type: 'ce',
                  userId: user.id,
               },
               mon: null,
               moveIn: data['Move-In Date'],
               order_date: null,
               status:
                  data.Status.toLowerCase() === 'pending'
                     ? { id: 'new', name: 'New' }
                     : { id: 'in_progress', name: 'In Progress' },
               package: {
                  home: null,
                  internet: null,
                  tv: null,
                  wireless: null,
               },
               propertyName: data.Property,
               referee: {
                  name: data['Leasing Agent Name'],
                  email: data['Leasing Agent Email'],
                  phone: data['Leasing Agent Mobile Phone'],
                  type: 'referee',
                  userId: user.id,
               },
               phone: formatPhone(data['Resident Mobile Phone Number']),
               userId: user.id,
               email: data['Resident Email'],
               apt: data['UnitApt#'] || null,
               isVerizonWirelessCustomer:
                  data['Verizon Mobile Status'] === 'Yes' ? true : false,
               followUpOn: null,
               type: data['Referral Type'].toLowerCase().includes('moving')
                  ? 'move'
                  : 'new',
               updated: null,
               applicationId: null,
               id: data['Referral Id'],
            }

            await setDoc(docRef, referral)
         })

      await Promise.all(promises)

      return true
   } catch (error) {
      console.error('Error adding documents in batch: ', error)
      return false
   }
}
