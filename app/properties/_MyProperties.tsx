'use client'
import FileUpload from '@/components/FileUpload'
import Loading from '@/components/Loading'
import PropertiesTable from '@/components/PropertiesTable'
import { useProperties } from '@/hooks/useProperties'
import { Card } from '@nextui-org/react'

const MyProperties = () => {
   const { properties, loading } = useProperties()
   const LU = properties.reduce((acc, current) => acc + current['TOTAL LU'], 0)
   const over100Units = properties.filter((p) => p['TOTAL LU'] >= 100).length
   const over50PercentData = properties.filter(
      (p) => +p['INTERNET PENETRATION'].split('%')[0] >= 50
   ).length

   if (loading) return <Loading />

   return (
      <div className='flex flex-col gap-4 w-full mx-auto '>
         <div className='flex items-center justify-between my-2'>
            <p className='text-xl font-semibold md:text-2xl'>My Properties</p>

            {properties.length > 0 && (
               <Card className='p-3 hidden md:flex'>
                  <div className='flex items-center gap-4'>
                     <div className='flex items-center gap-2'>
                        <p>Over 50% Data:</p>
                        <p className='font-bold'>{over50PercentData}</p>
                     </div>
                     <div className='flex items-center gap-2'>
                        <p>Over 100:</p>
                        <p className='font-bold'>{over100Units}</p>
                     </div>
                     <div className='flex items-center gap-2'>
                        <p>Total Units:</p>
                        <p className='font-bold'>{LU}</p>
                     </div>
                  </div>
               </Card>
            )}

            <FileUpload />
         </div>

         <PropertiesTable properties={properties} />
      </div>
   )
}

export default MyProperties
