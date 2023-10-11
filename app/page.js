import Header from '@/components/header/header'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'

export default async function Home() {
  const session = await getServerSession(authOptions)
  // console.log(session)
  return (
    <>
      <Header />
    </>
  )
}
