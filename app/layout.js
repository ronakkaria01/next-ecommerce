import './globals.scss'
import { getServerSession } from 'next-auth'
import Provider from '@/context/SessionProvider'
import { authOptions } from './api/auth/[...nextauth]/route'
import { CurrencyProvider } from '@/context/CurrencyContext'

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
          <CurrencyProvider>
            {children}
          </CurrencyProvider>
        </Provider>
      </body>
    </html>
  )
}
