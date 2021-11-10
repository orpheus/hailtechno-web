import { Link as RouterLink } from 'react-router-dom'
import styles from './styles'
import clsx from 'clsx'

export default function Link ({
  children,
  to,
  className,
  onClick,
  disabled
}) {
  const classes = styles()
  const disabledStyle = disabled && { pointerEvents: 'none', cursor: 'default' }
  return <RouterLink
    to={to}
    className={clsx(className, classes.root)}
    onClick={onClick}
    style={disabledStyle}
  >
    {children}
  </RouterLink>
}
