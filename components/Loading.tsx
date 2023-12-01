'use client'
import React from 'react'
import { Spinner } from '@nextui-org/react'

const Loading = () => {
   return (
      <div className='min-h-screen flex items-center justify-center'>
         <Spinner color='secondary' size='lg' />
      </div>
   )
}

export default Loading
