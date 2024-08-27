import { Spinner } from '@nextui-org/react'
import React from 'react'

export default function Loading() {
  return (
    <div className='flex justify-center items-center h-screen'>
        <Spinner label='Loading...' color='secondary' labelColor='secondary'/>
    </div>
  )
}
