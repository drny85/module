'use client'
import {
   Dropdown,
   DropdownItem,
   DropdownTrigger,
   User,
   Button,
   DropdownMenu,
} from '@nextui-org/react'
import { signOut, useSession } from 'next-auth/react'
import React from 'react'

const UserButton = () => {
   const { data: session } = useSession()
   if (!session) return
   return (
      <Dropdown>
         <DropdownTrigger>
            <User
               name={
                  <p className='font-semibold text-muted-foreground'>
                     {session.user?.name}
                  </p>
               }
               description={session.user?.email}
               avatarProps={{
                  src: session.user?.image || '',
               }}
            />
         </DropdownTrigger>
         <DropdownMenu>
            <DropdownItem onPress={() => signOut({ callbackUrl: '/' })}>
               <p className='font-semibold text-muted-foreground'>Log Out</p>
            </DropdownItem>
         </DropdownMenu>
      </Dropdown>
   )
}

export default UserButton
