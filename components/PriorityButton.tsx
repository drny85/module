'use client'
import { updateProperty } from '@/helpers/properties'
import { Priority, Property } from '@/types'
import {
   Button,
   Dropdown,
   DropdownItem,
   DropdownMenu,
   DropdownTrigger,
   Tooltip,
} from '@nextui-org/react'
import React from 'react'
import toast from 'react-hot-toast'
import { BiEditAlt } from 'react-icons/bi'

type Props = {
   property: Property
}
const PriorityButton = ({ property }: Props) => {
   const priorities: Priority[] = ['LOW', 'MEDIUM', 'HIGH', 'VERY HARD']
   const color =
      property.priority === 'HIGH'
         ? 'warning'
         : property.priority === 'VERY HARD'
         ? 'danger'
         : property.priority === 'MEDIUM'
         ? 'success'
         : 'primary'
   return (
      <Tooltip color={color} content='Priority' className='mb-1'>
         <span className='text-lg text-gray-500 cursor-pointer active:opacity-50'>
            <Dropdown>
               <DropdownTrigger>
                  <Button
                     endContent={<BiEditAlt />}
                     onClick={() => {}}
                     variant='ghost'
                     fullWidth
                     color={color}
                  >
                     {property.priority}
                  </Button>
               </DropdownTrigger>
               <DropdownMenu aria-label='Static Actions'>
                  {priorities.map((p) => (
                     <DropdownItem
                        key={p}
                        onPress={async () => {
                           const updated = {
                              ...property,
                              priority: p,
                           }
                           //console.log(updated)
                           const result = await updateProperty(updated)
                           if (result) {
                              toast.success('Priority Updated')
                           }
                        }}
                     >
                        {p}
                     </DropdownItem>
                  ))}
               </DropdownMenu>
            </Dropdown>
         </span>
      </Tooltip>
   )
}

export default PriorityButton
