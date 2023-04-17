'use client'

import React, { useCallback, useEffect, useState } from 'react'

import { IoMdClose } from 'react-icons/io';

import Button from '../Button';

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSumbit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disable?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSumbit,
  title,
  body,
  footer,
  actionLabel,
  disable,
  secondaryAction,
  secondaryActionLabel,
}) => {

  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen])

  const handleClose = useCallback(() => {
    if (disable) return;
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300)
  }, [disable, onClose]);

  const handleSubmit = useCallback(() => {
    if (disable) return;
    onSumbit();
  }, [disable, onSumbit]);


  const handleSecondaryAction = useCallback(() => {
    if (disable || !secondaryAction) return;
    secondaryAction();
  }, [disable, secondaryAction]);

  if (!isOpen) {
    return null;
  }


  return (
    <>
      <div className='fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none bg-neutral-800/70'>
        <div className='relative w-full h-full mx-auto my-6 md:w-4/6 lg:w-3/6 xl:w-2/5 lg:h-auto md:h-auto'>
          {/* 内容 */}
          <div className={`translate duration-300 h-full ${showModal ? 'translate-y-0' : 'translate-y-full'} ${showModal ? 'opacity-100' : 'opacity-0'}`}>
            <div className="relative flex flex-col w-full h-full bg-white border-0 rounded-lg shadow-lg outline-none translate lg:h-auto md:h-auto focus:outline-none">
              {/* 头部 */}
              <div className="flex items-center p-6 rounded-t justify-center relative border-b-[1px]">
                <button onClick={handleClose} className="absolute p-1 transition border-0 hover:opacity-70 left-9">
                  <IoMdClose size={18} />
                </button>
                <div className="text-lg font-PHRegular">
                  {title}
                </div>
              </div>

              {/* 主体 */}
              <div className="relative flex-auto p-6">
                {body}
              </div>

              {/* 底部操作 */}
              <div className="flex flex-col gap-2 p-6">
                <div className="flex flex-row items-center w-full gap-4">
                  {secondaryAction && secondaryActionLabel && (
                    <Button disabled={disable} label={secondaryActionLabel}
                      onClick={handleSecondaryAction} />
                  )}

                  <Button disabled={disable} label={actionLabel}
                    onClick={handleSubmit} />
                </div>
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Modal
