import { Link as RouterLink } from 'react-router-dom'
import styles from './styles'
import clsx from 'clsx'

export default function Link ({
  children,
  to,
  c
}) {
  const classes = styles()
  return <RouterLink to={to} className={clsx(c, classes.root)}>
    {children}
  </RouterLink>
}
