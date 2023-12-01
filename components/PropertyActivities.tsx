import { usePropertyActivities } from '@/hooks/usePropertyActivities'
import { Activity, Property } from '@/types'
import { Accordion, AccordionItem, Button } from '@nextui-org/react'
import moment from 'moment'
import AddActivityButton from './AddActivityButton'
import Loading from './Loading'
import { TrashIcon } from '@radix-ui/react-icons'

const PropertyActivities = ({ property }: { property: Property }) => {
   const { loading, activities } = usePropertyActivities(
      property['MDU PROP ID'].toString()
   )

   if (loading) return <Loading />

   return (
      <div className='mt-2'>
         <div className='flex items-center justify-between p-2'>
            <p></p>
            <p className='text-xl font-semibold'>
               {activities.length} Activities
            </p>
            <AddActivityButton property={property} />
         </div>
         <div className='flex items-center shadow-md p-1 rounded-md justify-between'>
            <Accordion>
               {activities?.map((activity: Activity) => (
                  <AccordionItem
                     key={activity.id}
                     className='my-2'
                     title={
                        <div className='flex items-center justify-between'>
                           <p className='font-semibold text-muted-foreground'>
                              Activity Type:
                           </p>
                           <p>{activity.type}</p>

                           <TrashIcon
                              height={20}
                              width={28}
                              className='text-danger'
                           />
                        </div>
                     }
                     subtitle={moment(activity.date).format('LLL')}
                  >
                     <div
                        className='bg-slate-100 p-2 rounded-lg'
                        key={activity.id}
                     >
                        <p className='text-muted-foreground italic'>
                           {activity.comment}
                        </p>
                     </div>
                  </AccordionItem>
               ))}
            </Accordion>
         </div>
      </div>
   )
}

export default PropertyActivities
