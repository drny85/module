'use client'
import { Activity, ActivityType, Property } from '@/types'
import {
   Button,
   Modal,
   ModalBody,
   ModalContent,
   ModalFooter,
   ModalHeader,
   Select,
   SelectItem,
   Textarea,
   useDisclosure,
} from '@nextui-org/react'
import { format } from 'date-fns'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { Calendar } from './ui/calendar'
import toast from 'react-hot-toast'
import DateTimePicker from './DateTimePicker'
import { addActivity } from '@/helpers/properties'

type Props = {
   property: Property
}
const activitiesType: string[] = ['Event', 'Visit', 'Introduction']

export default function AddActivityButton({ property }: Props) {
   const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
   const [loading, setLoading] = useState(false)
   const [showReview, setShowReview] = useState(false)
   const [showCalendar, setShowCalendar] = useState(false)
   const [activityType, setActivityType] = useState<ActivityType>()
   const [activity, setActivity] = useState<Activity>({
      type: activityType,
      date: undefined,
      comment: '',
      createdAt: new Date().toISOString(),
   })

   const onPressSave = () => {
      if (showReview) {
         handleActivitySubmit()
         return
      }
      if (activity.date && activity.type && activity.comment.length > 3) {
         setShowReview(true)
      } else {
         toast.error('Please fill in all fields')
      }
   }

   const handleActivitySubmit = async () => {
      console.log('Save activity')

      try {
         setLoading(true)
         const saved = await addActivity(
            property['MDU PROP ID'].toString(),
            activity
         )
         if (saved) {
            toast.success('Activity saved')
            setShowReview(false)
            setActivityType(undefined)
            setActivity({
               type: undefined,
               date: undefined,
               comment: '',
               createdAt: new Date().toISOString(),
            }),
               onClose()
         }
      } catch (error) {
         console.log(error)
      } finally {
         setLoading(false)
      }
   }

   return (
      <>
         <Button onPress={onOpen} color='primary'>
            Add Activity
         </Button>
         <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement='top-center'
            size='2xl'
         >
            <ModalContent>
               {(onClose) => (
                  <>
                     <ModalHeader className='flex flex-col gap-1 text-center'>
                        New Activity for {property['VSS PROP NAME']}
                     </ModalHeader>
                     <ModalBody>
                        {!showReview && (
                           <>
                              <div className='w-full min-h-1/2 flex flex-col space-y-5 itens-center mx-auto'>
                                 <div className='mx-auto flex flex-col items-center'>
                                    <p className='text-md font-semibold mb-1 text-muted-foreground '>
                                       Select a Date & Time
                                    </p>
                                    {/* <DateTimePicker
                                 selectedDate={date}
                                 onSelectDate={(d) => {
                                    if (d) setDate(d)
                                 }}
                              /> */}
                                    <div className='flex items-center'>
                                       {activity.date && (
                                          <div className='flex items-center gap-2'>
                                             <p>
                                                {format(
                                                   new Date(activity.date),
                                                   'PP'
                                                )}
                                             </p>
                                             <div>
                                                <DateTimePicker
                                                   selectedDate={
                                                      new Date(activity.date!)
                                                   }
                                                   onSelectDate={(d) => {
                                                      if (d) {
                                                         setActivity({
                                                            ...activity,
                                                            date: d.toISOString(),
                                                         })
                                                      }
                                                   }}
                                                />
                                             </div>
                                          </div>
                                       )}

                                       <Button
                                          onPress={() => setShowCalendar(true)}
                                          variant='light'
                                          color='secondary'
                                       >
                                          {activity.date
                                             ? 'Change'
                                             : 'Pick a Date'}
                                       </Button>
                                    </div>
                                    <AnimatePresence>
                                       {showCalendar && (
                                          <motion.div
                                             initial={{
                                                opacity: 0,
                                                translateY: -30,
                                             }}
                                             animate={{
                                                opacity: 1,
                                                translateY: 0,
                                             }}
                                             exit={{
                                                opacity: 0,
                                                translateY: -30,
                                             }}
                                             transition={{ duration: 0.2 }}
                                             className='flex items-center gap-2'
                                          >
                                             <Calendar
                                                selected={
                                                   new Date(activity.date!)
                                                }
                                                onDayClick={(d) => {
                                                   setActivity({
                                                      ...activity,
                                                      date: d.toISOString(),
                                                   })
                                                   setShowCalendar(false)
                                                }}
                                             />
                                          </motion.div>
                                       )}
                                    </AnimatePresence>
                                 </div>
                                 <div>
                                    <p className='text-md font-semibold mb-1 text-muted-foreground'>
                                       Select Activity Type
                                    </p>
                                    <Select
                                       value={activityType}
                                       selectedKeys={[activityType as any]}
                                       onChange={({ target: { value } }) => {
                                          setActivity({
                                             ...activity,
                                             type: value as ActivityType,
                                          })
                                          setActivityType(value as ActivityType)
                                       }}
                                       label=' Select Activity Type'
                                       fullWidth
                                    >
                                       {activitiesType.map((activity) => (
                                          <SelectItem
                                             key={activity}
                                             value={activity}
                                          >
                                             {activity}
                                          </SelectItem>
                                       ))}
                                    </Select>
                                 </div>
                                 <div>
                                    <Textarea
                                       label='Type the reason or purpose for this activity'
                                       value={activity.comment}
                                       onChange={({ target: { value } }) =>
                                          setActivity({
                                             ...activity,
                                             comment: value,
                                          })
                                       }
                                    />
                                 </div>
                              </div>
                           </>
                        )}
                        {showReview && (
                           <div className='flex flex-col gap-4'>
                              <p className='text-center text-xl font-semibold'>
                                 Review
                              </p>
                              <p>
                                 Activity Date & Time:{' '}
                                 <b>
                                    {' '}
                                    {format(new Date(activity.date!), 'PPp')}
                                 </b>
                              </p>
                              <p>
                                 Avtivity Type: <b> {activity.type}</b>{' '}
                              </p>
                              <div>
                                 <p className='font-semibold text-muted-foreground'>
                                    Comment
                                 </p>
                                 <div className='italic shadow-sm p-2 rounded-md bg-slate-200'>
                                    {activity.comment}
                                 </div>
                              </div>
                           </div>
                        )}
                     </ModalBody>
                     <ModalFooter>
                        <div className='flex gap-4 mt-5'>
                           <Button
                              variant='flat'
                              onPress={() => {
                                 if (showReview) {
                                    setActivity({
                                       ...activity,
                                       type: activityType,
                                    })
                                    setShowReview(false)
                                 } else {
                                    setActivity({
                                       type: undefined,
                                       date: undefined,
                                       comment: '',
                                       createdAt: new Date().toISOString(),
                                    })
                                    setActivityType(undefined)
                                    onClose()
                                 }
                              }}
                           >
                              {showReview ? 'Edit' : 'Cancel'}
                           </Button>
                           <Button
                              isLoading={loading}
                              isDisabled={loading}
                              color='secondary'
                              onPress={onPressSave}
                           >
                              {showReview ? 'Look Good!' : 'Save'}
                           </Button>
                        </div>
                     </ModalFooter>
                  </>
               )}
            </ModalContent>
         </Modal>
      </>
   )
}
