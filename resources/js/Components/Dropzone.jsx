import React, {
  ChangeEvent,
  DragEvent,
  InputHTMLAttributes,
  useCallback,
  useRef,
  useState,
} from 'react'
import Input from '@/Components/TextInput'
import classNames from 'classnames'

const Dropzone = ({onFilesAccepted, children}) => {
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef(null)
  const handleOpen = useCallback(() => {
    if (inputRef.current) inputRef.current.click()
  }, [])
  const handleFileChange = useCallback(
    (e) => onFilesAccepted(e.target.files),
    [onFilesAccepted]
  )
  const handleDragEnter = useCallback(() => setDragging(true), [])
  const handleDragExit = useCallback(() => setDragging(false), [])
  const handleDragOver = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])
  const handleDrop = useCallback((e) => {
    setDragging(false)
    e.preventDefault()
    e.stopPropagation()
    if (inputRef.current) {
      inputRef.current.files = e.dataTransfer.files
    }
  }, [])
  return (
    <div
      className={classNames(
        'cursor-pointer py-4 flex flex-col items-center border-2 border-dotted border-zinc-300 rounded-md',
        {
          '!border-ultramarine-500 bg-ultramarine/5 !border-solid': dragging,
        }
      )}
      onDragExit={handleDragExit}
      onDragEnter={handleDragEnter}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={handleOpen}
    >
      {children}
      <Input ref={inputRef} type="file" className="hidden" onChange={handleFileChange} />
    </div>
  )
}

export default Dropzone
