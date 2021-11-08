import styles from './styles'
import clsx from 'clsx'

const TextInput = ({
  id,
  className,
  label,
  value,
  onValueChange,
  labelProps = {},
  inputProps = {},
  placeholder,
  onBlur
}) => {
  const c = styles()

  // const [internalValue, setInternalValue] = useState(value)
  //
  // useEffect(() => {
  //   setInternalValue(value)
  // }, [value])
  //
  // useEffect(() => {
  //   onValueChange(internalValue)
  // }, [internalValue, onValueChange])
  //
  // function handleInternalChange (e) {
  //   setInternalValue(e.target.value)
  // }

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
      onChange={e => onValueChange(e.target.value)}
      value={value}
      placeholder={placeholder}
      onBlur={onBlur}
      {...inputProps}
    />
  </div>
}

export default TextInput
