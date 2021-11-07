import styles from './styles'
import clsx from 'clsx'

const FileInput = ({
  accept,
  id = 'file-upload',
  name = 'file-upload',
  multiple = 'false',
  labelProps = {},
  label,
  onFileSelect,
  className
}) => {
  const c = styles()

  return <div className={c.root}>
    <label
      htmlFor={id}
      {...labelProps}
      className={clsx(className, c.label)}
    >
      {label}
    </label>
    <input
      className={c.fileInput}
      accept={accept}
      id={id}
      name={name}
      multiple={multiple}
      type={'file'}
      onChange={onFileSelect}
    />

  </div>
}

export default FileInput
