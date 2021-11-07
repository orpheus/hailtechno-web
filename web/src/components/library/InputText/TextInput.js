import styles from './styles'
import { useEffect, useState } from 'react'
import clsx from 'clsx'

const TextInput = ({
  id,
  className,
  label,
  value,
  onValueChange,
  labelProps = {},
  inputProps = {},
  placeholder
}) => {
  const c = styles()

  const [internalValue, setInternalValue] = useState(value)

  useEffect(() => {
    setInternalValue(value)
  }, [value])

  useEffect(() => {
    onValueChange(internalValue)
  }, [internalValue, onValueChange])

  function handleInternalChange (e) {
    setInternalValue(e.target.value)
  }

  return <div className={c.root}>
    <label
      className={c.label}
      {...labelProps}
    >
      {label}
    </label>
    <input
      id={id}
      className={clsx(className, c.input)}
      type={'text'}
      onChange={handleInternalChange}
      value={internalValue}
      placeholder={placeholder}
      {...inputProps}
    />
  </div>
}

export default TextInput
