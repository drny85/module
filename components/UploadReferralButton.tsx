'use client'
import { Button } from '@nextui-org/react'
import { useCallback, useRef, useState } from 'react'
import * as XLSX from 'xlsx'

import { addAllProperties } from '@/helpers/properties'
import toast from 'react-hot-toast'
import { Referral } from '@/types'
import { addAllReferrals } from '@/helpers/referrals'

const UploadReferralButton = () => {
   const inputRef = useRef<HTMLInputElement>(null)

   const [loading, setLoading] = useState(false)

   const handlePress = () => {
      inputRef.current?.click()
   }

   const convertToCSV = useCallback((e: any) => {
      setLoading(true)
      const reader = new FileReader()
      reader.readAsBinaryString(e.target.files[0])
      reader.onload = async (e) => {
         const data = e.target?.result
         const workbook = XLSX.read(data, { type: 'binary' })

         workbook.SheetNames.forEach(async (sheet) => {
            const rowObject = XLSX.utils.sheet_to_json(
               workbook.Sheets[sheet]
            ) as unknown

            const d = rowObject as Referral[]

            try {
               const added = await addAllReferrals(d)
               if (added) {
                  toast.success('All data have been added successfully')
               }
            } catch (error) {
               console.log(error)
            } finally {
               setLoading(false)
            }
         })
      }

      // setValues(v)
   }, [])

   return (
      <div>
         <form>
            <input
               ref={inputRef}
               hidden
               type='file'
               onChange={convertToCSV}
               accept='.xlsx, .xls .cvs'
            />
            <Button
               disabled={loading}
               isLoading={loading}
               size='lg'
               color='secondary'
               variant='solid'
               onPress={handlePress}
            >
               Upload Referrals
            </Button>
         </form>
      </div>
   )
}

export default UploadReferralButton
