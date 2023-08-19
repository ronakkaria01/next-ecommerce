import './globals.scss'

export const metadata = {
  title: 'Next Ecommerce',
  description: 'A Next JS Based Ecommerce Platform.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className='text-slate-600'>{children}</body>
    </html>
  )
}
