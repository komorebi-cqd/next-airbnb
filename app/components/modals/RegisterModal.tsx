'use client'
import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { useState, useCallback } from 'react';
import { SubmitHandler, FieldValues, useForm } from 'react-hook-form'

import toast from 'react-hot-toast';
import useRegisterModal from '@/app/hooks/useRegisterModal'
import useLoginModal from '@/app/hooks/useLoginModal';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../Inputs/Input';
import Button from '../Button';
import { signIn } from 'next-auth/react';



const RegisterModal = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    });

    const onSumbit: SubmitHandler<FieldValues> = data => {
        setIsLoading(true);

        axios.post('/api/register', data).then(res => {
            registerModal.onClose();
        }).catch(err => {
            toast.error('发生了一些错误');
        }).finally(() => {
            setIsLoading(false);
        });
    };

    const toggle = useCallback(
        () => {
            registerModal.onClose();
            loginModal.onOpen();
        },
        [loginModal, registerModal],
    )

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading title='欢迎来到airbnb' subTitle='创建一个账号' />
            <Input id='email' label='Email' disabled={isLoading} register={register} errors={errors} required />
            <Input id='name' label='Name' disabled={isLoading} register={register} errors={errors} required />
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
                    <div>已经有账号了？</div>
                    <div onClick={toggle} className='cursor-pointer hover:underline text-neutral-800'>去登录</div>
                </div>
            </div>
        </div>
    )

    return (
        <Modal
            title='注册'
            actionLabel='下一步'
            isOpen={registerModal.isOpen}
            onClose={registerModal.onClose}
            onSumbit={handleSubmit(onSumbit)}
            disable={isLoading}
            body={bodyContent}
            footer={footerContent}
        />
    )
}

export default RegisterModal