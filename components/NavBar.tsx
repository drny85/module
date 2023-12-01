import { authOptions } from '@/providers/authOptions'
import { getServerSession } from 'next-auth'
import UserButton from './UserButton'
import NavBarLinks from './NavBarLinks'
import ThemeSwitcher from './ThemeSwitcher'

const NavBar = async () => {
   const session = await getServerSession(authOptions)
   if (!session) return
   return (
      <nav className='flex items-center justify-between mb-3 py-2 shadow-md px-3 rounded-sm'>
         <NavBarLinks />
         <div className='flex gap-3 items-center'>
            <ThemeSwitcher />
            <UserButton />
         </div>
      </nav>
   )
}

export default NavBar
