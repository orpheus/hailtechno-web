import styles from './styles'
import clsx from 'clsx'

const Button = ({
  id,
  className,
  children,
  onClick
}) => {
  const classes = styles()

  return <button
    id={id}
    className={clsx(className, classes.root)}
    onClick={onClick}>
    {children}
  </button>
}

export default Button
