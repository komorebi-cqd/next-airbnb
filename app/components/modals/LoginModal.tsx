'use client'
import axios from 'axios';
import { signIn } from 'next-auth/react'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { useState, useCallback } from 'react';
import { SubmitHandler, FieldValues, useForm } from 'react-hook-form'

import toast from 'react-hot-toast';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../Inputs/Input';
import Button from '../Button';
import useLoginModal from '@/app/hooks/useLoginModal';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import { useRouter } from 'next/navigation';



const LoginModal = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const onSumbit: SubmitHandler<FieldValues> = data => {
        setIsLoading(true);

        signIn('credentials',{
            ...data,
            redirect: false,
        }).then(callback => {
            setIsLoading(false);
            if(callback?.ok){
                toast.success('登录成功');
                router.refresh();
                loginModal.onClose();
            }

            if(callback?.error){
                toast.error(callback.error)
            }
        })
    };

    const toggle = useCallback(
      () => {
        loginModal.onClose();
        registerModal.onOpen();
      },
      [loginModal,registerModal],
    )
    

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading title='欢迎回来' subTitle='登录您的账号' />
            <Input id='email' label='Email' disabled={isLoading} register={register} errors={errors} required />
            <Input id='password' label='Password' type='password' disabled={isLoading} register={register} errors={errors} required />
        </div>
    )

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <Button outline label='使用Google登录' icon={FcGoogle} onClick={() => signIn('google')} />
            <Button outline label='使用GitHub登录' icon={AiFillGithub} onClick={() => signIn('github')} />
            <div className="mt-4 text-center text-neutral-500 font-PHLight">
                <div className="flex flex-row items-center justify-center gap-2">
                    <div>第一次使用爱彼迎？</div>
                    <div onClick={toggle} className='cursor-pointer hover:underline text-neutral-800'>创建账号</div>
                </div>
            </div>
        </div>
    )

    return (
        <Modal
            title='登录'
            actionLabel='下一步'
            isOpen={loginModal.isOpen}
            onClose={loginModal.onClose}
            onSumbit={handleSubmit(onSumbit)}
            disable={isLoading}
            body={bodyContent}
            footer={footerContent}
        />
    )
}

export default LoginModal