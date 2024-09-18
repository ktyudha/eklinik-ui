import { FunctionComponent, useEffect, useState } from 'react'
import { FileState } from '@hooks/useFileUpload'
import { UilFolderUpload, UilTrashAlt } from '@iconscout/react-unicons'

interface Props {
  file: FileState | null
  getRootProps: any
  getInputProps: any
  onRemove: VoidFunction
  image?: string
  readOnly?: boolean
}

const DocumentInput: FunctionComponent<Props> = ({
  file,
  getInputProps,
  getRootProps,
  onRemove,
  image,
  readOnly = false,
}) => {
  const [imageState, setimageState] = useState(image)

  useEffect(() => {
    if (image) {
      setimageState(image)
    }
  }, [image, imageState])

  const onHandleGetRootProps = () => {
    if (!readOnly) {
      return { ...getRootProps() }
    }

    return false
  }

  const onRemoveImage = () => {
    setimageState('')
    onRemove()
  }

  return (
    <>
      <div className='flex items-center justify-center gap-3 border-2 rounded-md relative'>
        <div
          className='flex items-center gap-2 bg-white border-1 px-4 py-10 rounded-md cursor-pointer'
          {...onHandleGetRootProps()}
        >
          <UilFolderUpload size={30} />
          <span className='font-semibold text-lg'>
            {file?.name || 'Pilih Dokumen'}
          </span>
          <input {...getInputProps()} />
        </div>

        <button
          className='bg-white hover:bg-red-500 p-2 rounded-md border border-red-500 text-red-500 hover:text-white absolute right-5'
          onClick={() => !readOnly && onRemoveImage()}
        >
          <UilTrashAlt size={20} />
        </button>
      </div>
    </>
  )
}

export default DocumentInput
