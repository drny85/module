'use client'
import Loading from '@/components/Loading'
import ReferralsTable from '@/components/ReferralsTable'
import { useReferrals } from '@/useReferrals'
import React from 'react'

const Referrals = () => {
   const { loading, referrals } = useReferrals()

   if (loading) return <Loading />
   return (
      <div>
         <ReferralsTable referrals={referrals} />
      </div>
   )
}

export default Referrals
