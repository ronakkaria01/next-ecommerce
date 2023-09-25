import './globals.scss'
import { getServerSession } from 'next-auth'
import Provider from '@/components/providers/SessionProvider'
import { authOptions } from './api/auth/[...nextauth]/route'

export const metadata = {
  title: 'Next Ecommerce',
  description: 'A Next JS Based Ecommerce Platform.',
}

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions)
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className='text-slate-600'>
        <Provider session={session}>
          {children}
        </Provider>
      </body>
    </html>
  )
}
