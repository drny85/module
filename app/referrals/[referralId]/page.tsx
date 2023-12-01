import React from 'react'

const ReferralDetails = ({
   params: { referralId },
}: {
   params: { referralId: string }
}) => {
   return <div>ReferralDetails {referralId}</div>
}

export default ReferralDetails
