
import Navbar from './components/Navbar/Navbar'
import RegisterModal from './components/modals/RegisterModal'
import LoginModal from './components/modals/LoginModal';
import ClientOnly from './components/ClientOnly'
import ToasterProvider from './providers/ToasterProvider'
import getCurrentUser from './actions/getCurrentUser';

import './globals.css'
import RentModal from './components/modals/RentModal';
import SearchModal from './components/modals/SearchModal';

export const metadata = {
  title: '我的租房网站',
  description: '通过next.js创建的',
}


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className='font-smiley'>
        <ClientOnly>
          <ToasterProvider />
          <LoginModal />
          <RegisterModal />
          <RentModal />
          <SearchModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div className="pb-20 pt-28">
          {children}
        </div>
      </body>
    </html>
  )
}
