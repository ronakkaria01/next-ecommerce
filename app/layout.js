import './global.css'
import { getServerSession } from 'next-auth'
import Provider from '@/context/SessionProvider'
import { authOptions } from './api/auth/[...nextauth]/route'
import { CurrencyProvider } from '@/context/CurrencyContext'
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  weight: ['400', '500', '600', '700']
})

export const metadata = {
  title: 'Next Ecommerce',
  description: 'A Next JS Based Ecommerce Platform.',
}

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions)
  return (
    <html lang="en" className={montserrat.className}>
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
