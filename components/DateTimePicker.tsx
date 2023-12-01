// DateTimePicker.tsx
import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

interface DateTimePickerProps {
   selectedDate: Date | null
   onSelectDate: (date: Date | null) => void
}

const DateTimePicker = ({
   selectedDate,
   onSelectDate,
}: DateTimePickerProps) => {
   return (
      <div className='flex items-center mx-auto relative max-w-fit'>
         <DatePicker
            selected={selectedDate}
            onChange={onSelectDate}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={30}
            timeCaption='Time'
            dateFormat='h:mm aa'
            className='border p-2 flex items-center rounded-md hover:outline-1 cursor-pointer hover:border-slate-500 transition-all'
         />
      </div>
   )
}

export default DateTimePicker
