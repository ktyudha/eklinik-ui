import { FunctionComponent, ReactNode, useMemo } from 'react'

interface Props {
  onOpen: boolean
  title: string
  modalSize?: string
  modalHeight?: string
  children: ReactNode
  onClose: () => void
}

const Modal: FunctionComponent<Props> = ({
  onOpen,
  title,
  modalSize,
  modalHeight,
  children,
  onClose,
}) => {
  const size = useMemo(() => {
    if (modalSize === 'sm') {
      return '400px'
    } else if (modalSize === 'md') {
      return '600px'
    } else if (modalSize === 'lg') {
      return '90%'
    }
  }, [modalSize])

  return (
    <div
      id="static-modal"
      data-modal-backdrop="static"
      tabIndex={-1}
      aria-hidden="true"
      className={`fixed flex items-center justify-center top-0 left-0 right-0 z-10 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full max-h-full ${onOpen ? 'backdrop-blur-sm' : 'hidden'}`}
    >
      <div className={`relative max-h-full w-[${size}]`}>
        {/* Modal Content */}
        <div className={`relative bg-white rounded-lg drop-shadow-lg h-[${modalHeight}]`}>
          {/* Modal Header */}
          <div className="flex items-start justify-between p-4 rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900">
              {title}
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="static-modal"
              onClick={onClose}
            >
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          
          {/* Modal Body */}
          <div className="flex flex-col h-full gap-3 px-6 pb-6 pt-3 space-y-6 z-20">
            {children}
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default Modal
