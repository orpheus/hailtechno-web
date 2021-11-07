import styles from './styles'
import { useEffect, useState } from 'react'
import clsx from 'clsx'

const SelectInput = ({
  id,
  className,
  label,
  value,
  onValueChange,
  labelProps = {},
  selectProps = {},
  options,
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
    <select
      id={id}
      className={clsx(className, c.select)}
      onChange={handleInternalChange}
      value={internalValue}
      placeholder={placeholder}
      {...selectProps}
    >
      {options.map((opt, i) => {
        return <option value={opt} key={i}>{opt}</option>
      })}
    </select>
  </div>
}

export default SelectInput
