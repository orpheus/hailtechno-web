import { Link as RouterLink } from 'react-router-dom'
import styles from './styles'
import clsx from 'clsx'

export default function Link ({
  children,
  to,
  className,
  onClick
}) {
  const classes = styles()
  return <RouterLink
    to={to}
    className={clsx(className, classes.root)}
    onClick={onClick}
  >
    {children}
  </RouterLink>
}
