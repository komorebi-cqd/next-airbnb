'use client'

import { useState, useCallback, useEffect } from 'react'
import Avatar from '../Avatar'
import MenuItem from './MenuItem'

import { AiOutlineMenu } from 'react-icons/ai'
import useRegisterModal from '@/app/hooks/useRegisterModal'
import useLoginModal from '@/app/hooks/useLoginModal'
import { SafeUser } from '@/app/types'
import { signOut } from 'next-auth/react'


interface UserMenuProps {
  currentUser?: SafeUser | null
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {

  const [isOpen, setIsOpen] = useState(false);

  const registermodal = useRegisterModal();
  const loginModal = useLoginModal();

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  useEffect(() => {
    if(registermodal.isOpen || loginModal.isOpen){
      setIsOpen(false);
    }
  },[registermodal.isOpen,loginModal.isOpen])



  return (
    <div className='relative'>
      <div className="flex flex-row items-center gap-3">
        <div onClick={() => { }} className='hidden px-4 py-3 text-sm transition rounded-full cursor-pointer md:block hover:bg-neutral-100'>
          创建你的房间
        </div>
        <div onClick={toggleOpen} className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition">
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image}/>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">

            {currentUser ? (
              <>
                <MenuItem label='我的旅行' onClick={() => signOut()} />
                <MenuItem label='我的喜欢' onClick={() => signOut()} />
                <MenuItem label='我的预约' onClick={() => signOut()} />
                <MenuItem label='我的属性' onClick={() => signOut()} />
                <MenuItem label='我的房子' onClick={() => signOut()} />
                <hr />
                <MenuItem label='退出登录' onClick={() => signOut()} />
              </>
            ) : (
              <>
                <MenuItem label='注册' onClick={registermodal.onOpen} />
                <MenuItem label='登录' onClick={loginModal.onOpen} />
              </>
            )
            }


          </div>
        </div>
      )}
    </div>
  )
}

export default UserMenu
