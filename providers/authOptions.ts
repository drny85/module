import { firebaseAuth, firestore } from '@/providers/firestore'
import { sendVerificationRequest } from '@/utils//sendVerificationToken'
import { FirestoreAdapter } from '@auth/firebase-adapter'
import type { AuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebase'
import { User } from 'next-auth'
import { resend } from '@/utils/resend'
import MagicLinkEmail from '@/emails/MagigLink'
import { toast } from 'react-hot-toast'
import EmailProvider from 'next-auth/providers/email'

function text({ url, host }: { url: string; host: string }) {
   return `Sign in to ${host}\n${url}\n\n`
}

export const authOptions: AuthOptions = {
   providers: [
      GoogleProvider({
         clientId: process.env.GOOGLE_CLIENT_ID!,
         clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
         authorization: {
            params: {
               prompt: 'consent',
               access_type: 'offline',
               response_type: 'code',
            },
         },
      }),
      EmailProvider({
         //id: 'resend',
         type: 'email',
         //name: 'Email',
         server: null,
         // options: {},
         async sendVerificationRequest({ identifier, url }) {
            const { host } = new URL(url)

            try {
               const data = await resend.emails.send({
                  from: `My Module <${process.env.RESEND_EMAIL}>`,
                  to: [identifier],
                  subject: `Log in to Your Module Site`,
                  text: text({ url, host }),
                  react: MagicLinkEmail({ url, host }),
               })
               console.log('Email sent successfully', data)
               //return { success: true, data }
            } catch (error) {
               const err = error as Error
               toast.error(err.message)
               // throw new Error('Failed to send the verification Email.')
            }
         },

         //@ts-ignore
      }),
      CredentialsProvider({
         name: 'Credentials',
         credentials: {
            email: { label: 'Email', type: 'text' },
            password: { label: 'Password', type: 'password' },
         },
         async authorize(credentials): Promise<User | null> {
            if (!credentials || !credentials.email || !credentials.password)
               return null
            const { user } = await signInWithEmailAndPassword(
               auth,
               credentials?.email!,
               credentials?.password!
            )
            if (user) {
               return {
                  id: user.uid,
                  ...user,
               }
            } else {
               return null
            }
         },
      }),
   ],
   callbacks: {
      session: async ({ session, token }) => {
         if (session?.user) {
            if (token.sub) {
               session.user.id = token.sub
               const fbToken = await firebaseAuth.createCustomToken(token.sub)
               session.firebaseToken = fbToken
            }
         }
         return session
      },

      jwt: async ({ token, user }) => {
         if (user) {
            token.id = user.id
         }
         return token
      },
   },
   adapter: FirestoreAdapter(firestore),
   session: {
      strategy: 'jwt',
   },
}
