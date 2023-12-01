import FileUpload from '@/components/FileUpload'
import { authOptions } from '@/providers/authOptions'
import { getServerSession } from 'next-auth'

const Home = async () => {
   const session = await getServerSession(authOptions)
   console.log(session)

   return (
      <div className='pt-10 w-full mx-auto'>
         <div className='flex flex-col gap-4 w-full mx-auto '>
            <div className='flex items-center justify-between '>
               <p className='text-xl font-semibold md:text-2xl'>
                  My Properties
               </p>
            </div>
         </div>
      </div>
   )
}

export default Home
