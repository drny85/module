import { authOptions } from '@/providers/authOptions'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
   try {
      const session = await getServerSession(authOptions)

      if (session) return NextResponse.json(session.user)
      return NextResponse.json(null)
   } catch (error) {
      console.log('Error getting user from server', error)
      return NextResponse.json(null, { status: 500 })
   }
}
