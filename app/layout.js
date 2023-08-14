import './globals.scss'

export const metadata = {
  title: 'Next Ecommerce',
  description: 'A Next JS Based Ecommerce Platform.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
