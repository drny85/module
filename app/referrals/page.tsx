import UploadReferralButton from '@/components/UploadReferralButton'
import React from 'react'
import Referrals from './_Referrals'

const ReferralsPage = () => {
   return (
      <div>
         <div className='flex items-center justify-between px-2 my-3'>
            <p className='text-xl font-semibold'>My Referrals</p>
            <UploadReferralButton />
         </div>
         <Referrals />
      </div>
   )
}

export default ReferralsPage
