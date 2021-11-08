import styles from './styles'
import clsx from 'clsx'
import { useRef } from 'react'

const FileInput = ({
  accept,
  id = 'file-upload',
  name = 'file-upload',
  multiple = false,
  labelProps = {},
  label,
  onChange,
  className
}) => {
  const c = styles()
  const ref = useRef()

  return <div className={c.root}>
    <label
      htmlFor={id}
      {...labelProps}
      className={clsx(className, c.label)}
    >
      {label}
    </label>
    <input
      ref={ref}
      className={c.fileInput}
      accept={accept}
      id={id}
      name={name}
      multiple={multiple}
      type={'file'}
      onChange={e => {
        onChange(e)
        ref.current.value = ''
      }}
    />

  </div>
}

export default FileInput
