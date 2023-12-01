import { referralsCollection } from '@/collections'
import { Referral } from '@/types'
import { onSnapshot } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

export const useReferrals = () => {
   const [loading, setLoading] = useState(true)
   const { data: session } = useSession()
   const [referrals, setReferrals] = useState<Referral[]>([])

   useEffect(() => {
      if (!session) {
         setLoading(false)
         return
      }
      const sub = onSnapshot(referralsCollection(session.user.id), (snap) => {
         setReferrals(snap.docs.map((prop) => ({ ...prop.data() })))
         setLoading(false)
      })

      return sub
   }, [session])

   return { loading, referrals }
}
