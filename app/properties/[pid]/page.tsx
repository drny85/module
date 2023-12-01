'use client'
import AddActivityButton from '@/components/AddActivityButton'
import Loading from '@/components/Loading'
import PriorityButton from '@/components/PriorityButton'
import PropertyActivities from '@/components/PropertyActivities'

import { useProperty } from '@/hooks/useProperty'
import { Card } from '@nextui-org/react'

const PropertyDetails = ({ params }: { params: { pid: string } }) => {
   const { property, loading } = useProperty(params.pid)

   if (loading || !property) return <Loading />
   return (
      <div className='mx-auto flex flex-col w-full'>
         <Card className='p-4'>
            <div className='flex justify-between items-center shadow-md p-2 rounded-md'>
               <p>
                  PID <b>{property?.['MDU PROP ID']}</b>
               </p>
               <p className='text-center text-xl font-semibold'>
                  {property?.['VSS PROP NAME']}
               </p>
               <PriorityButton property={property} />
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2'>
               <div className='space-y-2 text-center'>
                  <div className='flex flex-col items-center'>
                     <p className='text-xl font-semibold rounded-md my-2'>
                        Street
                     </p>
                     <p>
                        {property?.['VSS STREET NO']} {property?.['VSS STREET']}
                     </p>
                     <p>
                        {property?.['VSS CITY']}, {property?.['VSS STATE']}{' '}
                        {property?.['VSS ZIP CODE']}
                     </p>
                  </div>
                  <div className='flex items-center flex-col'>
                     <p className='text-xl font-semibold rounded-md my-2'>
                        Penetration
                     </p>
                     <div className='flex space-x-2'>
                        <p>
                           DATA: <b>{property?.['INTERNET PENETRATION']}</b>
                        </p>
                        <p>
                           TV: <b>{property?.['TV PENETRATION']}</b>
                        </p>
                     </div>
                  </div>
                  <div className='flex items-center flex-col'>
                     <p className='text-xl font-semibold rounded-md my-2'>
                        Units
                     </p>
                     <div className='flex space-x-2'>
                        <p>
                           LU: <b>{property?.['TOTAL LU']}</b>
                        </p>
                        <p>
                           BUS: <b>{property?.['TOTAL BUS UNITS']}</b>
                        </p>
                        <p>
                           RES: <b>{property?.['TOTAL BUS UNITS']}</b>
                        </p>
                     </div>
                  </div>
               </div>
               <div className='space-y-1 text-center flex flex-col items-center'>
                  <p className='text-xl font-semibold rounded-md my-2'>CE</p>
                  <p>{property?.['AM NAME']}</p>
                  <p className='text-xl font-semibold rounded-md my-2'>RMM</p>
                  <p>{property?.['RMM NAME']}</p>
                  <p className='text-xl font-semibold rounded-md my-2'>Coach</p>
                  <p>{property?.['EM/EVENTS CHANNEL COACH NAME']}</p>
               </div>
            </div>
         </Card>
         {/* <DatePicker date={date!} setDate={setDate} label='Pick A Event Date' /> */}
         <PropertyActivities property={property} />
      </div>
   )
}

export default PropertyDetails
